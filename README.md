# Doggo API

This is the API for The Doggo App. It handles requests for authentication, user account pages, walk booking, and walk pages. It is built with Node JS, Express, Postgres, and AWS S3.

## Endpoints

The base URL for the Doggo App is 'https://doggo.ca/api' The following endpoints are handled by the Doggo API:

### Authentication
'/login': This endpoint handles requests from existing users. Emails and passwords are sent in the request body of post calls to the API. The API returns an auth token and user object representing the logged in user

### User endpoints

'/user': Accepts posts to create new users in the database. 

'user/:user_id': Accepts GET and PATCH requests. GET requests return the user object for the requested user. PATCH requests update user objects. Updatable fields from the client include profile_photo and bio

### Walk Endpoints

Walk endpoints are used to return information about walks that are stored in the database

'/walk': accepts GET and POST requests. GET requests return all walks in the database. POST requests are used to write new walks to the database when a new walk is requested by a user in the component "BookWalkForm"

'/walk/:walk_id': Accepts GET and PATCH requests. GET requests return the walk object for the requested walk id. PATCH requests are used to update walk statuses, walk comments, and walk ratings. 

### Walker Endpoints

The Walker Endpoint is used to populate the list of available walkers in the "browse walkers" screen.

'/walker': Accepts GET requests that return a list of walkers in the database.

### Photo Endpoints

The photo endpoints are used to route pre-signed URLs to AWS S3. The endpoints are used to route profile_photo images from the client directly to the AWS bucket where they are stored

'/upload': creates a properly formatted object for upload to AWS and generates a signed URL to send to AWS.

'/get-image': generates a signed URL to facilitate the download of the correct profile photo






