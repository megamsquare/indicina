# Title: RESTful API for URL shortening
This project is to create APIs that convert a long URL to a short URL.

### Setup and installation
Install all dependecies

```bash
npm install
```

To initialize this API, run

```bash
npm start
```

it will run on http://localhost:3001

## API Endpoints

### POST /api/v1/encode

Create a short url

#### Request

- Method: POST
- Path: /api/v1/encode
- Request Body: long_url is requested which takes in sting

Example of Request body:
{
   "long_url": "https://longurl.com"
}

Response: Returns short url created for the long url submitted 

Status Code: 201 (CREATED)

### POST /api/v1/decode

Get long url that belongs to the short url

#### Request

- Method: POST
- Path: /api/v1/decode
- Request Body: short_url is requested which takes in sting

Example of Request body:
{
    "short_url": "http://short.est/ctWOfb"
}

Response: Returns long url that belongs to the short url submitted

Status Code: 200 (OK)

### GET /api/v1/statistic/:url_path

Get User profile by userid/username/email

#### Request

- Method: GET
- Path: /api/v1/statistic/:url_path
- Request Body: This gets url_path in the parameter

Example of Request body:
NONE

Response: This will return the statistics details of the short url, which include total number of visits and ip address of visitors

Status Code: 200 (OK)

### Testing
To test, you need to install the dependencies ny running the syntax below:

```bash
npm install
```

Then you need to run the below syntax in your terminal:

```bash
npm test
```

### Technologies Used
- Node.js
- Express.js
- Body-parser
- Typescript
- Jest
- IP
- Nodemon
- Supertest
- Ts-node