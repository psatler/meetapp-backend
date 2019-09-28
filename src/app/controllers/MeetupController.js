import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

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
      console.log('MeetupController.store', error);
    }

    return res.json(meetup);
  }

  // ### listing the meetups organized by the logged user ###
  async index(req, res) {
    const loggedUserID = req.userId;

    const meetups = await Meetup.findAll({
      where: {
        user_id: loggedUserID,
      },
      attributes: ['id', 'title', 'description', 'location', 'date'],
      include: [
        // including info got from the relationship with Files table
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }
}

// getting the meeups by user
// modifying File model to return the url of the file
// for that, we set up a static route to serve static files. We do that by
// using a middleware.

export default new MeetupController();
