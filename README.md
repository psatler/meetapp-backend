# MeetApp

> Event's aggregator app using an Express backend

This is a portfolio project showcasing Nodejs in the backend. The application is an event's aggregator for developers.

#

## Features

### _Authentication_

An user can authenticate itself in the application by using an email and password.

- Authentication using JWT :ballot_box_with_check:
- Input validation using yup :ballot_box_with_check:

### _Registration and update of user_

New users can registrate themselves using name, email and password. :ballot_box_with_check:

To update the password, the user should also send a field to confirm the password. :ballot_box_with_check:

- Users can log in and register. The user's password is encrypted when saved in the database. :ballot_box_with_check:

### _Files management_

There will be a route to perform upload of files. This rout ewill register the path of the file in a database table and return all the file's information. :ballot_box_with_check:

### _Meetup management_

A user can create meetups in the application's database by using a `title of meetup`, `description`, `locatization`, `date and time` and a `banner image`. All of the mentioned fields are **required**. Also, there is a `user_id` field to store the user who organizes the meetup. :ballot_box_with_check:

It is not possible to create meetups with dates already passed. :ballot_box_with_check:

The user can edit all the fields of a meetup that hasn't happened yet and the user is the organizer. :ballot_box_with_check:

Create a route to list all the meetups organized by the logged user. :ballot_box_with_check:

The user should be able to cancel meetups organized by them and that didn't happen yet. The cancelation should delete the meetup from the database. :ballot_box_with_check:

### _Meetup subscription_

The user should be able to register themselves in meetups not organized by them.

The user cannot register themselves in meetups that already happened.

The user cannot register themselves twice in a same meetup.

The user cannot register themselves in two different meetups that happen in the same date and time.

Whenever a user register themselves in a meetup, an email should be sent to the organizer of the meetup having pieces of information of the registered user. An email template should be created as well.

### _Listing the meetups_

There is a route that lists the meetups with a filter by date only (not time). The results of that list should come paginated by 10 items per page. Below is an example of a request to the route for listing the meetups: :ballot_box_with_check:

```
http://localhost:3333/meetups?date=2019-07-01&page=2
```

In the example's above, we're listing the page 2 of the meetups that will happen in the 1st of July.

In this listing, also return the organizer's information. :ballot_box_with_check:

### _Listing the subscriptions_

There is a route to list the meetups that the logged user is registered.

Only list those meetups that haven't happened yet. Also, sort the nearest meetup as first ones of the list.

#

## Some tools used

- Sucrase + nodemon
- ESLint + Prettier + EditorConfig
- Sequelize with PostgresSQL

#

## License

This project is licensed under the terms of the [MIT License](https://opensource.org/licenses/mit-license.html) © Pablo Satler 2019
