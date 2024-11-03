import Joi from 'joi';

export const todoSchema = Joi.object({
  title: Joi.string().trim().min(1).optional(),
  description: Joi.string().optional(),
  completed: Joi.boolean().optional()
});
