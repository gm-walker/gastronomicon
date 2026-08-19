import express, { type Express, type Request, type Response } from 'express';
import 'dotenv/config';
import neo4j from 'neo4j-driver';
import { auth } from "./lib/auth.ts";

const app_db = neo4j.driver(process.env.NEO4J_URI!, neo4j.auth.basic('neo4j', 'gastronomicon'));
const app: Express = express();

app.get('/', async (req: Request, res: Response) => {
    try {
        await app_db.verifyConnectivity();
        // If context can be accessed, auth is initialized.
        const ctx = await auth.$context;
        console.log('Connection established');
        return res.json({ status: "ok", auth: "operational" });
    } catch (error: any) {
        console.log(`An error occurred:\n${error}\nCause: ${error.cause}`);
        return res.json({ status: 500, message: error.message });
    }
});

export default app;