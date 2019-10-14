import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';

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
}

export default new SubscriptionController();
