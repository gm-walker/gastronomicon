import { betterAuth } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { db } from '../db/database.ts';

export const auth = betterAuth({
   database: drizzleAdapter(db, {
       provider: 'pg',
   }),
});
