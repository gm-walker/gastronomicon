import app from './app.ts';

const port = 3000;

const server = app.listen(port, () => { console.log(`gastro-api listening on port ${port}!`) });

process.on('SIGINT', () => {
    console.log('SIGINT signal recieved: closing gastro-api HTTP server...');
    server.close(() => {
        console.log('Successfully closed the server!');
        process.exit(1);
    })
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing gastro-api HTTP server...')
    server.close(() => {
        console.log('Successfully closed the server!');
        process.exit(0);
    })
});