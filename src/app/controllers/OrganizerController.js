import Meetup from '../models/Meetup';
import File from '../models/File';

class OrganizerController {
  // listing the meetup of the organizer
  async index(req, res) {
    const loggedUserID = req.userId; // get the organizer id

    const meetups = await Meetup.findAll({
      where: {
        user_id: loggedUserID,
      },
      attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
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

export default new OrganizerController();
