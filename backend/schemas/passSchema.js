const Joi = require('joi');

const passSchema = Joi.object()
  .keys({
    password: Joi.string()
      .required()
      .min(8)
      .max(50)
      .error((errors) => {
        if (
          errors[0].code === 'any.required' ||
          errors[0].code === 'string.empty'
        )
          return new Error('Password is required');
        return new Error('Password must have between 8 and 50 characters');
      }),
  })
  .unknown(true);

module.exports = passSchema;
