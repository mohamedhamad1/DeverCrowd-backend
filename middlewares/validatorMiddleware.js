const { validationResult } = require('express-validator');
const errorHandler = require('../utils/errorHandler')
const httpResponse = require('../utils/httpResponse')
const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorHandler.create(
        "Error",
        httpResponse.status.badrequest,
        {
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg,
            }))
        }
    );
    return next(error)
  }
  next();
};

module.exports = validateMiddleware;
