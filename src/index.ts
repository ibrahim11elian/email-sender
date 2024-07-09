import { app } from './app';

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('unhandledRejection', () => {
  console.log('unhandledRejection, shutting down...');
  server.close();
  process.exit(1);
});
