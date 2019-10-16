import { Op } from 'sequelize';
import { parseISO } from 'date-fns';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class SubscriptionController {
  async store(req, res) {
    const loggedUserId = req.userId;
    const { meetupId } = req.params;

    // meetup the user wants to subscribe to
    const foundMeetup = await Meetup.findByPk(meetupId);

    if (!foundMeetup) {
      return res.status(400).json({
        error: 'Meetup not found.',
      });
    }

    // checking if subscriber is not also the organizer of the selected meetup
    if (foundMeetup.user_id === loggedUserId) {
      return res.status(401).json({
        error: 'User must not be meetup organizer',
      });
    }

    if (foundMeetup.past) {
      return res.status(400).json({
        error: 'Cannot subscribe to past meetups',
      });
    }

    // looking for any sub to the selected meetup
    const foundSubscription = await Subscription.findOne({
      where: {
        meetup_id: meetupId,
      },
    });

    if (foundSubscription && foundSubscription.user_id === loggedUserId) {
      return res.status(400).json({
        error: 'User already subscribed',
      });
    }

    // looking for if an user has subscribed to another meetup at the same date
    const sameDate = await Subscription.findOne({
      where: {
        user_id: loggedUserId,
      },
      attributes: ['id', 'user_id', 'meetup_id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true, // If true, converts to an inner join, which means that the parent model will only be loaded if it has any matching children
          attributes: [
            'id',
            'past',
            'title',
            'description',
            'location',
            'date',
            'banner_image_id',
            'user_id',
          ],
          where: {
            date: {
              [Op.eq]: foundMeetup.date,
            },
          },
        },
      ],
    });

    if (sameDate) {
      // return the error and the info about the other meetup the user is subbed to
      return res.status(400).json({
        error: 'You are subscribed to another meetup at this same time',
        sameDateSubbedMeetup: sameDate,
      });
    }

    const createdSub = await Subscription.create({
      user_id: loggedUserId,
      meetup_id: meetupId,
    });

    return res.json(createdSub);
  }

  async index(req, res) {
    const loggedUserId = req.userId;

    // below it shows the pieces of information of the meetup along with the
    // its banner image and the organizer info as well
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: loggedUserId,
      },
      order: [[{ model: Meetup, as: 'meetup' }, 'date', 'ASC']], // ordering the subscriptions by date showing the closest by date first
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            // past: false, // returning only meetups that has not happened yet can't use past as this is a virtual field in db
            date: {
              [Op.gt]: new Date(), // returning dates greater (in the future) than current date
            },
          },
          // order: [['date', 'DESC']], // ordering the meetup by date showing the most recent first
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'date',
            'past',
          ],
          include: [
            {
              model: File,
              as: 'banner',
              attributes: ['id', 'path', 'url'],
            },
            {
              // pulling the user (organizer) info of the meetup
              model: User,
              as: 'organizer',
              attributes: ['id', 'name', 'email'],
              // pulling the avatar picture of the organizer
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'path', 'url'],
                },
              ],
            },
          ],
        },
      ],
    });

    return res.json(subscriptions);
  }
}

export default new SubscriptionController();
