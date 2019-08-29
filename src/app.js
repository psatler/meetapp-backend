const express = require('express')
const routes = require('./routes')

class App {
    constructor() {
        this.server = express()

        this.middleware()
        this.routes()
    }

    // setting up the methods of the class
    middleware() {
        // making it possible to handle json requests
        this.server.use(express.json())
    }

    routes() {
        // we could`ve done like below, but we'll import the routes from another file
        // this.server.get('/', )
        this.server.use(routes)
    }
}

module.exports = new App().server