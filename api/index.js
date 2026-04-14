'use strict';

const HapiPostgresConnection = require('hapi-postgres-connection');

// Helper Functions

async function getIngredients(request, h){
  let ingredientName = request.query.name;
  let select = "select i.name, i.description, v.name as volume, w.name as weight from ingredients as i join volume v on v.id = i.volume_id join weight w on w.id = i.weight_id where i.name = $1";
  try {
    const result = await request.pg.client.query(select, [ingredientName]);
    console.log(`Retrieved ${ingredientName}\n`);
    return h.response(result.rows[0])
    .type('text/json');
  } catch(err) {
    console.log(err);
  }
}
async function getPairings(request, h){
  let ingredientName = request.query.name;
  let select = "select a.name as ingredientA, b.name as ingredientB from pairings join ingredients a on pairings.ingredientA = a.id join ingredients b on pairings.ingredientB = b.id where a.name = $1 OR b.name = $1";
  try {
    const result = await request.pg.client.query(select, [ingredientName]);
    console.log(`Retrieved pairings with ${ingredientName}\n`);
    return h.response(result.rows)
    .type('text/json');
  } catch(err) {
    console.log(err);
  }
}

// Server Initialization
const hapi = require('@hapi/hapi');

const init = async () => {
  const server = hapi.server({
    host: "0.0.0.0",
    port: 3000,
    routes: {
      cors: {
        origin: ['*'],
        credentials: true
      }
    }
  });
  await server.register({
    plugin: HapiPostgresConnection,
    options: {
      connectionString: process.env.DATABASE_URL
    }
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: async (request, h) => {
        try {
          const result = await request.pg.client.query('SELECT NOW()');
          console.log('✓ Database connection successful:', result.rows[0]);
          return h.response(result.rows[0]);
        } catch(err) {
          console.error('✗ Database connection failed:', err.message);
          return h.response({ errorMessage: err.message});
        }
      }
    },
    {
      method: 'GET',
      path: '/ingredients',
      handler: getIngredients
    },
    {
      method: 'GET',
      path: '/pairings',
      handler: getPairings
    }]);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
