# MERN Pay App

### Complete fullstack payment application with error handling and JWT authentication.

---

## Features

- Users can login
- Users can signup
- Users can logout
- Users can update profile
- Users can delete profile
- Users can send money to other users

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- React
- React Router DOM
- Tailwind CSS

## How to use

1. To start the server:

   i. Create `.env` file and store the env variables.

   ii. Use this format:

   ```javascript
   JWT_SECRET = <"YOUR JWT SECRET">
   MONGO_URI = <"YOUR MONGO URI">
   ```

   iii. Run the server:

   ```bash
   cd backend
   npm install
   npm run start
   ```

   Server will be running on http://localhost:5000

2. To start the frontend:

You should add your backend url in the BASE_URL variable in `api.jsx`.

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Frontend will be running on http://localhost:5173

## Notes & Troubleshooting

This App uses MongoDB's transaction feature, for which the database should be a replica set. It will run smoothly for a MongoDB Atlas instance. But for a local MongoDB instance, you may need to use the `rs.initiate()` thing. Google about that issue before running it locally.

Your MongoDB version should be 4.0+

### For reference: this thing worked for me.

I created 3 replica set dbs.

For creating dbs:

```bash
mongod --port 27018 --dbpath "C:\Program Files\MongoDB\Server\7.0\db1" --replSet rs1
mongod --port 27019 --dbpath "C:\Program Files\MongoDB\Server\7.0\db2" --replSet rs1
mongod --port 27020 --dbpath "C:\Program Files\MongoDB\Server\7.0\db3" --replSet rs1
```

For initiating the replica dbs:

```js
rs.initiate({
  _id: "rs1",
  members: [
    { _id: 0, host: "localhost:27018" },
    { _id: 1, host: "localhost:27019" },
    { _id: 2, host: "localhost:27020" },
  ],
});
```
