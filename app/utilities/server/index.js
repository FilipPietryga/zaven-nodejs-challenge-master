'use strict';

/**
 * Create server for application on port
 * @param {object} application - express application
 * @param {number} port - port number
 * @return {Promise} - Promise with server
 */
module.exports = async (application, port) => {
  return new Promise((resolve, reject) => {
    let server = application.listen(port, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(server);
      }
    });

    server.port = port;

    server.on('error', (err) => {
      reject(err);
    });
  });
};
