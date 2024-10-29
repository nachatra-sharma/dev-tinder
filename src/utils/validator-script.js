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

const updateUserSchema = zod.object({
  firstName: zod.string().min(4).max(20),
  lastName: zod.string().min(4).max(20).optional(),
  email: zod.string().email(),
  age: zod.string(),
  gender: zod.enum(["male", "female", "others"]),
  photoURL: zod.string().url().optional(),
});

const updatePasswordSchema = zod.object({
  oldPassword: zod.string().min(4).max(16),
  newPassword: zod.string().min(4).max(16),
});

module.exports = {
  loginUserSchema,
  createUserSchema,
  updateUserSchema,
  updatePasswordSchema,
};
