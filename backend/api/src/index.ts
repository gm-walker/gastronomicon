import express, { type Express, type Request, type Response } from 'express';
import 'dotenv/config';
import neo4j from 'neo4j-driver';
import { auth } from "@lib/auth";

const app_db = neo4j.driver(process.env.NEO4J_URI!, neo4j.auth.basic('neo4j', 'gastronomicon'));
const app: Express = express();
const port = 3000;

app.get('/', async (req: Request, res: Response) => {
    try {
        await app_db.verifyConnectivity();
        // If context can be accessed, auth is initialized.
        const ctx = await auth.$context;
        console.log('Connection established');
        return res.json({ status: "ok", auth: "operational" });
    } catch (err) {
        console.log(`An error occurred:\n${err}\nCause: ${err.cause}`);
        return res.json({ status: "err", message: err.message }, { status: 500 });
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
