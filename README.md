# Blood Pressure Tracker (server)
This app is the server component for a Blood Pressure Tracker system. The client repo is located here [client](https://github.com/xpertimage/bp_tracker_client).
The full list of features is listed in the Client ReadMe document located here: [Client Readme](https://github.com/xpertimage/bp_tracker_client/blob/main/README.md)

### Description
Blood Pressure Tracker is a "SPA" (single page application) using hide and show techniques to keep the interface simple and intuitive while reducing network traffic and server delay. Based on a "Client - Server" architecture the app was developed using Javascript and includes Bootstrap, Node, Express, HTML, CSS, jQuery and uses Ajax to manage the HTTP communications between client and server. The server is hosted on Heroku.com and the client repository is on Github.com.

### Technology
This is a Node / Express server created using Javascript Mongoose and MongoDB. It consists of CRUD routes and Autheentication routes to allow for Sign-up, Sign-In, Sign-Out and Change Password. The CRUD (Create, Read, Update, Delete) routs are used to store and manage a user's blood pressure readings.

### Planning
The planning process began with wireframe sketches and user stories. The user stories were valuable in that they bring to the surface features and interfaces that were not thought of initially. Links to these resources are below.

The development was done on a local Express / Node server with the client running on the same computer using grunt as the html server. The server and API was the first part that was developed then I tested the API using Curl scripts from a terminal window. Next the Client development started with basic Authentication then the features of storing, retreiving and updating data on the server.

User stories
As a user I should be able to sign up using email and password

As a user I should be able to sign in

As a user I should be able to change my password once Iam signed in.

As a signed in user I should be able to sign out.

As a signed in user I should be able to enter my BP readings

As a signed in user I should be able to see a history of my BP readings

As a signed in user I should be able to search for a BP reading

As a signed in user I should be able to update a previous reading

As a signed in user I should be able to delete a reading.

![Wireframes](puplic/WireDiagram/WireDiagrams-Start.jpg)
![Wireframes](puplic/WireDiagram/WireDiagrams-SignIn.jpg)
![Wireframes](puplic/WireDiagram/WireDiagrams-FindOne.jpg)
![Wireframes](puplic/WireDiagram/WireDiagrams-DeleteOne.jpg)
![Wireframes](puplic/WireDiagram/WireDiagrams-ChgPass.jpg)

[Client Repo](https://github.com/xpertimage/bp_tracker_client)

![Entity Relationship Diagram](public/ERD.jpg)
