# NDS: NAVOMI Data Store

NDS is a simple Node.js application that utilizes Redis to implements a REST-based HashMap. With NDS, you can quicky store and retrieve text-based data. NDS is perfect for use cases requiring independent services to access text-based data using a known text-based key.

## Installation

NDS is a basic Node.js application so it follows the standard installation process.

```
git clone https://github.com/navomi-inc/navomi-data-store-app.git
cd navomi-data-store-app
npm install
```
**This version of NDS will only connect to a local instance of Redis running on port 6379.**

To launch NDS

```
npm run start
```

## How to Use

We attempted to make NDS a no-brainer to use. NDS only contains two endpoints: one to store data and one to retrieve it.

### Store Data

#### POST /data

Request
```
{
  "itemId":"12345678",
  "itemData":"The rain in Spain falls gently on the plane"
}
```

Response
```
{
  "status": "success",
  "message": "Data stored successfully"
}

Response code: 201
```

### Get Data

#### GET /data/:itemId

Request
```
GET /data/12345678
```

Response
```
{
  "itemId":"12345678",
  "itemData":"The rain in Spain falls gently on the plane"
}

Response code: 200
```