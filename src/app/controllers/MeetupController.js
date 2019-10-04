import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
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

    const isValid = await schema.isValid(req.body);
    if (!isValid) {
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
      attributes: ['id', 'title', 'description', 'location', 'date'],
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
}

export default new MeetupController();
