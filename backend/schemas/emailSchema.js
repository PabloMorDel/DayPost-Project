const Joi = require('joi');

const emailSchema = Joi.object()
  .keys({
    email: Joi.string()
      .required()
      .min(8)
      .max(50)
      .email()
      .error((errors) => {
        if (
          errors[0].code === 'any.required' ||
          errors[0].code === 'string.empty'
        )
          return new Error('Email is required');
        return new Error('Email must have between 8 and 50 characters');
      }),
  })
  .unknown(true);

module.exports = emailSchema;
