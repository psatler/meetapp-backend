<p align="center">
  <img alt="Repository Last Commit Date" src="https://img.shields.io/github/last-commit/psatler/reactjs-github-app?color=blue">

  <a href="https://www.linkedin.com/in/pablosatler/">
    <img alt="Made by Pablo Satler" src="https://img.shields.io/badge/made%20by-Pablo%20Satler-blue">
  </a>

  <img alt="License" src="https://img.shields.io/github/license/psatler/reactjs-github-app?color=blue">

</p>

# MeetApp

> Event's aggregator app using an Express backend

This is a portfolio project showcasing Nodejs in the backend. The application is an event's aggregator for developers.

#

## Table of Contents

- [How to Run](#how-to-run)

- [Features](#features)
  - [Authentication](#authentication)
  - [Registration and update of user](#registration-and-update-of-user)
  * [Files management](#files-management)
  * [Meetup management](#meetup-management)
  * [Meetup subscription](#meetup-subscription)
  * [Listing the meetups](#listing-the-meetups)
  * [Listing the subscriptions](#listing-the-subscriptions)
    <!-- - [Screens of the app](#screens-of-the-app) -->
- [Some dependecies used](#some-dependecies-used)
  <!-- - [Acknowledgements](#acknowledgements) -->
- [License](#license)

## How to run

The easiest way to run this backend application is by using Docker and Docker-Compose.

```
sudo docker-compose up
```

Then, execute the migrations defined in the `src/database/migrations` to create the tables for the database of the application.

```
yarn sequelize db:migrate

or

npx sequelize db:migrate
```

After that, you should be all set with the backend.

**Tips**:

- you can visualize if the postgres database is running by using a GUI interface like [Postbird](https://www.electronjs.org/apps/postbird) (you can also use a CLI for that).
- you can also refer to the available commands for the sequelize-cli [here](https://www.npmjs.com/package/sequelize-cli).

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

The user should be able to register themselves in meetups not organized by them. :ballot_box_with_check:

The user cannot register themselves in meetups that already happened. :ballot_box_with_check:

The user cannot register themselves twice in a same meetup. :ballot_box_with_check:

The user cannot register themselves in two different meetups that happen in the same date and time. :ballot_box_with_check:

Whenever a user register themselves in a meetup, an email should be sent to the organizer of the meetup having pieces of information of the registered user. An email template should be created as well. :ballot_box_with_check:

### _Listing the meetups_

There is a route that lists the meetups with a filter by date only (not time). The results of that list should come paginated by 10 items per page. Below is an example of a request to the route for listing the meetups: :ballot_box_with_check:

```
http://localhost:3333/meetups?date=2019-07-01&page=2
```

In the example's above, we're listing the page 2 of the meetups that will happen in the 1st of July.

In this listing, also return the organizer's information. :ballot_box_with_check:

### _Listing the subscriptions_

There is a route to list the meetups that the logged user is registered. :ballot_box_with_check:

Only list those meetups that haven't happened yet. Also, sort the closest meetup to happen as first ones of the list. :ballot_box_with_check:

#

## Some dependecies used

- [Sucrase](https://github.com/alangpierce/sucrase): It's a transpiler like babel (but faster) which allow us to use ES6 features in Nodejs, like `import` syntax instead of `require`.
- [Nodemon](https://github.com/remy/nodemon): it's a tool that monitors files changes in nodejs based applications, relauching the application when these changes are detected.
- [ESLint](https://github.com/eslint/eslint): A fully pluggable tool for identifying and reporting on patterns in JavaScript
- [Prettier](https://github.com/prettier/prettier): An opinionated code formatter
- [EditorConfig](https://github.com/editorconfig/editorconfig): It helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
- [PostgresQL](https://hub.docker.com/_/postgres): used for data storage
- [Sequelize](https://github.com/sequelize/sequelize): An ORM (Object-relational mapping) for Nodejs
    <!-- - [Mongo DB](https://hub.docker.com/_/mongo): a NOSQL database used for storing notifications -->
  <!-- - [Mongoose](https://github.com/Automattic/mongoose): elegant mongodb object modeling for node.js -->
- [Redis](https://hub.docker.com/_/redis/): a key-value in memory storage
- [Bee-Queue](https://github.com/bee-queue/bee-queue): for managing the emails (as jobs) to be sent when a user subscribes to the meetup
- [Nodemailer](https://nodemailer.com/about/): Nodejs module for sending emails
- [Nodemailer Express Handlebars](https://www.npmjs.com/package/nodemailer-express-handlebars): A plugin for nodemailer that uses express-handlebars view engine to generate emails.
- [Multer](https://github.com/expressjs/multer): Node.js middleware for handling multipart/form-data (primarly used for uploading files)
- [Sentry](https://sentry.io/welcome/) for error monitoring in production

#

<!-- ## Acknowledgements

Using docker to isolate the services used by the backend application. So, a container for Nodejs, another for Redis and another one for PostgresQL.

to perform a dump from Postgres container named 'database': `sudo docker exec -it database pg_dumpall -c -U postgres > dump_`date +%d-%m-%Y"_"%H_%M\_%S`.sql`

to restore the database: `cat your_dump.sql | docker exec -i your-db-container psql -U postgres`

To fix files according to ESLint: `yarn eslint --fix src --ext .js`

# -->

## License

This project is licensed under the terms of the [MIT License](https://opensource.org/licenses/mit-license.html) © Pablo Satler 2019
