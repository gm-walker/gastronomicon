import express, { type Express, type Request, type Response } from 'express';
import neo4j from 'neo4j-driver';

//TODO use environment variables to receive connection information
const driver = neo4j.driver('neo4j://app-db:7687', neo4j.auth.basic('neo4j', 'gastronomicon'));
const app: Express = express();
const port = 3000;

app.get('/', async (req: Request, res: Response) => {
    try {
        await driver.verifyConnectivity();
        console.log('Connection established')
    } catch (err) {
        console.log(`An error occurred:\n${err}\nCause: ${err.cause}`)
    }
});

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
