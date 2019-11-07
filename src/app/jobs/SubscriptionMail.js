import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    // returning an unique key
    return 'SubscriptionMail';
  }

  // executes for every process
  async handle({ data }) {
    console.log('The queue has been executed');
    // console.log(data);

    const { foundMeetup, subscriberInfo } = data;
    await Mail.sendMail({
      to: `${foundMeetup.organizer.name} <${foundMeetup.organizer.email}>`,
      subject: 'You`ve got a new subscriber',
      // text: `You have a new subscriber to the ${foundMeetup.title}`,
      template: 'subscription',
      context: {
        organizer: foundMeetup.organizer.name,
        user: subscriberInfo && subscriberInfo.name,
        userEmail: subscriberInfo && subscriberInfo.email,
        eventName: foundMeetup.title,
        eventDate: format(
          parseISO(foundMeetup.date),
          "'On' MMMM dd, 'at' H:mm "
        ),
      },
    });
  }
}

export default new SubscriptionMail();
