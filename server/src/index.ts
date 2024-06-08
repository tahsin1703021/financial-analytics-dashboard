import express from 'express';
const graphqlHTTP = require('express-graphql').graphqlHTTP;
import cors from 'cors';
import mongoose from 'mongoose';
import initialSchema from './schemas/initialSchema';

const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://compass_home_test:GWrOXoHlDedBphNX@recruitment.fagsjqo.mongodb.net/sample_analytics?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: initialSchema,
    graphiql: true,
  }),
);

app.listen(8000, () => {
  console.log('Listenig for requests on port 8000');
});
