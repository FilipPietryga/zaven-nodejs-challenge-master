'use strict';

module.exports = function (error, req, res, next) {
  res.sendError({
    statusCode: 500,
    errorCode: 500,
    developerMessage: 'Unexpected error'
  });

  next(error);
};