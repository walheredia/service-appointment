import express from 'express';
import routes from './components';

const app = express();

app.use(express.json());
app.use('/', routes);

app.use((req, res, next) => {
  return res.status(404).json({
    message: 'The given resource is not implemented.'
  });
});

export default app;
