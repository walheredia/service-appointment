import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
