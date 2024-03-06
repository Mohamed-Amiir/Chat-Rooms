import Joi, { ObjectSchema } from "joi";

const schema: ObjectSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
});

export default schema;
