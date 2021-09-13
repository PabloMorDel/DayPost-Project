const Joi = require('joi');

const userNameSchema = Joi.object()
  .keys({
    userName: Joi.string()
      .required()
      .min(3)
      .max(20)
      .error((errors) => {
        if (
          errors[0].code === 'any.required' ||
          errors[0].code === 'string.empty'
        )
          return new Error('User name is required');
        return new Error('User name must have between 3 and 20 characters');
      }),
  })
  .unknown(true);
//THIS DOESN'T WORK WITHOUT .unknown(true). Don't ask
module.exports = userNameSchema;
