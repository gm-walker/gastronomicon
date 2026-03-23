'use strict';

// Helper Functions

function getIngredients(){}
function getPairings(){}

// Server Initialization
const hapi = require('@hapi/hapi');

const init = async () => {
  const server = hapi.server({
    host: "0.0.0.0",
    port: 3000,
  });
  server.route(
    {
      method: 'GET',
      path: '/ingredients',
      handler: (request, h) => {
        // This retrieves information about ingredient(s) (this should be the least expensive operation).
      },
    },
    {
      method: 'GET',
      path: '/pairings',
      handler: (request, h) => {
        // This retrieves the first 10 pairings of an ingredient (this is more expensive).
      }
    } 
  );
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
