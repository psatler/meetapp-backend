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
  - [Files management](#files-management)
  - [Meetup management](#meetup-management)
  - [Meetup subscription](#meetup-subscription)
  - [Listing the meetups](#listing-the-meetups)
  - [Listing the subscriptions](#listing-the-subscriptions)
    <!-- - [Screens of the app](#screens-of-the-app) -->
- [Endpoints](#endpoints)
  - [Explanation](#explanation)
  - [Running with insomnia](#running-with-insomnia)
- [Some dependecies used](#some-dependecies-used)
  <!-- - [Acknowledgements](#acknowledgements) -->
- [License](#license)

## How to run

The easiest way to run this backend application is by using Docker and Docker-Compose. So, you should have both installed on you machine to run this as demonstrated below.

### _running with Docker_

First, you need to clone this repository to your local machine. After done cloning, change directory into it. Next, you should start the containers using the `docker-compose up` command. All the steps are shown below:

```
git clone https://github.com/psatler/meetapp-backend.git

cd meetapp-backend

sudo docker-compose up
```

PS: if you have docker added to your user group, you might not need to add sudo in front of the command.

PS2: The migrations for the PostgresQL DB is set up to be run on the container start up, so we should have the database ready after the command above finishes its start up process;

After that, you should be all set with the backend.

**Tips**:

- you can visualize if the postgres database is running by using a GUI interface like [Postbird](https://www.electronjs.org/apps/postbird) (you can also use a CLI for that).
- you can also refer to the available commands for the sequelize-cli [here](https://www.npmjs.com/package/sequelize-cli).

[Back to Top](#meetapp)

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

[Back to Top](#meetapp)

#

## Endpoints

This application was tested along with the [Insomnia](https://insomnia.rest/) REST client. Below you'll find an explanation of each endpoint this backend has and also a button to download the examples/endpoints used and load them in your insomnia app.

### _Explanation_

- **Subscription**

  - **_post_** (create): `/meetup/{meetupId}/subscription` - subscribe logged in user to the meetup.

  - **_get_** (list): `/subscriptions` - list the user's subscriptions.

- **Organizer**

  - **_get_** (list): `/organizer` - list the meetups organized by the logged in user.

- **Meetups**

  - **_get_** (show - display one meetup): `/meetups/{meetupId}` - get meetup information by ID.

  - **_get_** (list - index): `/meetups` - list the all meetups. It can receive query parameters as _date_ and _page_, becoming `/meetups?date=2020-04-22&page=1`, for example. This is better explained at the [Listing the meetups](#listing-the-meetups) subsection above.

  - **_post_** (create/store): `/meetups` - create a brand new meetup.

  - **_put_** (update): `/meetups/{meetupId}` - update a meetup by ID.

  - **_delete_**: `/meetups/{meetupId}` - delete a meetup by ID.

- **Files**

  - **_post_** (create/store): `/files` - uploads and store the banner/avatar image file in the API. The files is sent as a _Multipart Form_ data in the body with the property named as `file`.

- **Session**

  - **_post_** (create/store - it's a public route): `/session` - creates the user session returning the jwt token used for authentication in the routes. The email and password credentials are sent via _json_ in the request body.

- **Users**

  - **_post_** (create/store - it's a public route): `/users` - creates a brand new user. The _name_, _email_ and _password_ of the new user is sent via the body of the request as _json_.

  - **_put_** (update): `/users` - updates the pieces of information about the logged in user. The new name, email or even avatar (`avatar_id`) are sent via the body of the request via _json_.

[Back to Top](#meetapp)

### _Running with Insomnia_

You can load the endpoints to test with the Insomnia REST client by clicking on the button below:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Meetup%20Backend%20API%20Test&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fpsatler%2Fmeetapp-backend%2Fmaster%2Finsomnia-export%2FInsomnia_2020-march-8th.json)

Then, copy the URL and in the Insomnia app, look for the _Import Data_ button, and choose _From URL_ to load it to your app.

[Back to Top](#meetapp)

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
- [Yup](https://github.com/jquense/yup): Dead simple Object schema validation
- [Axios](https://github.com/axios/axios): Promise based HTTP client for the browser and node.js
- [Sentry](https://sentry.io/welcome/) for error monitoring in production

[Back to Top](#meetapp)

#

## Acknowledgements

- This backend is using docker to isolate the services used by the application. So, a container for Nodejs, another for Redis and another one for PostgresQL (there is also one for mongoDB). To perform a dump from Postgres container named 'database', you can do: `sudo docker exec -it database pg_dumpall -c -U postgres > dump_`date +%d-%m-%Y"_"%H_%M\_%S`.sql`
  On the other hand, to restore the database, you can run: `cat your_dump.sql | docker exec -i your-db-container psql -U postgres`. More on that can be found at the following [stackoverflow link](https://stackoverflow.com/questions/24718706/backup-restore-a-dockerized-postgresql-database).

- Used docker volumes to persist database data when shutting down the containers. For [Postgres](https://hub.docker.com/_/postgres) image, a volume was set up for the `PGDATA` environment variable.

- Also, to save/persist the photos uploaded, it was used volumes to map to a local folder the photos uploaded to the container. To rebuild the container image after the changes, the followind command was ran: `sudo docker-compose up --build`. You might need to delete the `PGDATA` folder first do be able to rebuild the image.

- To fix files according to ESLint, for example, `js` files inside the _src_ folder: `yarn eslint --fix src --ext .js`

- To create the _Run in insomnia_ button, you can follow the instructions found at [https://support.insomnia.rest/article/68-run-button](https://support.insomnia.rest/article/68-run-button) or this [youtube video](https://youtu.be/3tB0uDliS6Y?t=1757) (in Pt-BR). In summary, paste the URL (from the Raw view) of the exported json at [https://insomnia.rest/create-run-button/](https://insomnia.rest/create-run-button/) so that we have a markdown snippet for the button with the exported json.

[Back to Top](#meetapp)

#

## License

This project is licensed under the terms of the [MIT License](https://opensource.org/licenses/mit-license.html) © Pablo Satler 2019
