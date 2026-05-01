# Task Manager
# Author: Kyle Jones

## Tools
- Node.js
- npm
- React
- Express.js

## My Approach
On the backend, I went with a simple json file for data storage.
The api flows like this:

1. `server.js` starts the server and sets up the routes in `task.routes.js`.
    - Validation middleware is provided to validate the request.
2. When an endpoint is hit, `task.controller.js` is called with the appropriate method.
    - The controller handles all intermediate logic; it parses the request, formats the response, etc.
3. The controller calls `task.model.js` which handles reading from and writing to storage.
    - `utils/storage.js` contains helper methods for accessing the json file.

<br>

The frontend is a simple React app.
- `ApiService.ts` is a class that handles all the fetch calls.
- `App.tsx` is the root component. It creates an instance of `ApiService` and uses state for the list of tasks and the input for creating a new task.
- `Task.tsx` is a reusable component that handles the display, editing, and deleting of the given task.

<br>

## Running the app
Create two terminals and `cd` into the `api` and `client` directories.
<br>
`cd api` and `cd client`

In both directories, install the required dependencies.
<br>
`npm install`

To start the api, run `npm run start`. It will be hosted at [http://localhost:8080](http://localhost:8080) by default.

To start the client, run `npm run dev`. It will be hosted at [http://localhost:5173](http://localhost:5173) by default.
