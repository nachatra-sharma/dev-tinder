const zod = require("zod");

const loginUserSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(4).max(16),
});

const createUserSchema = zod.object({
  firstName: zod.string().min(4).max(20),
  email: zod.string().email(),
  password: zod.string().min(4).max(16),
  age: zod.string(),
  gender: zod.enum(["male", "female", "others"]),
});

module.exports = {
  loginUserSchema,
  createUserSchema,
};
