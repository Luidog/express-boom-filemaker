const boom = require('boom');
const helperMethods = ['wrap', 'create'];

module.exports = () => (req, res, next) => {
  if (res.boom) throw new Error('boom already exists on response object');

  res.boom = {};
  Object.getOwnPropertyNames(boom).forEach(function(key) {
    if (typeof boom[key] !== 'function') return;
    if (helperMethods.indexOf(key) !== -1) {
      res.boom[key] = () => boom[key].apply(boom, arguments);
    } else {
      res.boom[key] = function() {
        const boomed = boom[key].apply(boom, arguments);
        const boomedPayloadAndAditionalResponse = Object.assign(
          boomed.output.payload,
          arguments[1]
        );
        res.set('x-error-message', boomed.output.payload.message);
        return res
          .status(boomed.output.statusCode)
          .send(boomedPayloadAndAditionalResponse);
      };
    }
  });

  next();
};
