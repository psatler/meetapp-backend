import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isBefore, parseISO, startOfDay, endOfDay, isValid } from 'date-fns';
import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

const PAGINATION_LIMIT = 10;

class MeetupController {
  // validate and create a meetup
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner_image_id: Yup.number().required(), // id of the image uploaded by the user
    });

    const isSchemaValid = await schema.isValid(req.body);
    if (!isSchemaValid) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // if everything went well, obtain user's ID from token
    const { userId } = req;
    const { title, description, location, date, banner_image_id } = req.body;

    // checking if the date the user is creating the meetup is not a past date
    const registrationDate = parseISO(date);
    if (isBefore(registrationDate, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    // create the meetup registration
    let meetup = null;
    try {
      meetup = await Meetup.create({
        title,
        description,
        location,
        date,
        banner_image_id, // referencing the banner's meetup
        user_id: userId, // referencing the user who is creating the meetup
      });
    } catch (error) {
      console.warn('MeetupController.store', error);
    }

    return res.json(meetup);
  }

  // ### listing the meetups filtered by date and also paginated ###
  async index(req, res) {
    // the default page is 1
    const { page = 1, date } = req.query;
    const whereObj = {};

    // check if there is a date in the query
    if (date) {
      const searchedDate = parseISO(date);
      whereObj.date = {
        [Op.between]: [startOfDay(searchedDate), endOfDay(searchedDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where: whereObj, // either empty object or one with date range inside
      limit: PAGINATION_LIMIT, // limiting the number of results sent back from the database
      offset: (page - 1) * PAGINATION_LIMIT,
      attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
      order: [['date', 'DESC']],
      include: [
        // including info got from the relationship with Files table
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'name', 'path', 'url'],
        },
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(meetups);
  }

  async update(req, res) {
    // validating the fields passed when the organizer is updating a meetup info
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      banner_image_id: Yup.number(), // id of the image uploaded by the user
    });

    // if is not valid, go inside if-statement
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Schema Validation has failed' });
    }

    const loggedUserId = req.userId; // property added in the middleware
    const { meetupId } = req.params;

    const foundMeetup = await Meetup.findByPk(meetupId);

    // if null
    if (!foundMeetup) {
      return res
        .status(400)
        .json({ error: 'Meetup not found for with this id' });
    }

    // if the meetup id queried do not belongs to the logged user
    // in summary, if the logged user is not the organizer of the meetup
    if (loggedUserId !== foundMeetup.user_id) {
      return res
        .status(401)
        .json({ error: 'Not authorized to access this meetup info.' });
    }

    // check if date entered by user is not a past date or an invalid one
    const dateEntered = parseISO(req.body.date);
    if (!isValid(dateEntered)) {
      return res.status(400).json({
        error: 'Date inserted is invalid',
      });
    }
    if (isBefore(dateEntered, new Date())) {
      return res.status(400).json({
        error: 'Date inserted is a past date',
      });
    }

    // user cannot update past meetups
    if (foundMeetup.past) {
      return res.status(400).json({
        error: 'Can not update past updates',
      });
    }

    // if pass all validations, update fields passed in the body of the request
    const meetupUpdated = await foundMeetup.update(req.body);
    // console.log(foundMeetup.past);
    return res.json(meetupUpdated);
  }

  async delete(req, res) {
    const loggedUserId = req.userId;
    const { meetupId } = req.params;

    const foundMeetupToDelete = await Meetup.findByPk(meetupId);

    // if there is no meetup with that id
    if (!foundMeetupToDelete) {
      return res.status(400).json({
        error: 'Meetup not found',
      });
    }

    // if user is trying to delete a meetup that they're not the organizer
    if (foundMeetupToDelete.user_id !== loggedUserId) {
      return res.status(401).json({
        error: 'Not authorized to delete this meetup',
      });
    }

    // check if meetup has already passed
    // past comes from virtual field in the Meetup model
    if (foundMeetupToDelete.past) {
      return res.status(400).json({
        error: 'You cannot delete past meetups',
      });
    }

    // destroy the row corresponding to this instance
    await foundMeetupToDelete.destroy();

    return res.send();
  }
}

export default new MeetupController();
