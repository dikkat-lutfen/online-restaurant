const express = require('express');
const app = express();
const connectDB = require('./db/dbConnection');
const userRoute = require('./routes/usersRoutes');
const pizzasRoute = require('./routes/pizzasRoute');
const port = 5000;
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api/users/', userRoute);
app.use('/api/pizzas/', pizzasRoute);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
