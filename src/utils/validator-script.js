const zod = require("zod");

const loginUserSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(4).max(16),
});

const createUserSchema = zod.object({
  firstName: zod.string().min(4).max(20),
  lastName: zod.string().optional(),
  email: zod.string().email(),
  password: zod.string().min(4).max(16),
  age: zod.number().min(18).max(60),
  gender: zod.enum(["male", "female", "others"]),
  photoURL: zod
    .string()
    .url()
    .optional()
    .default(
      "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
    ),
});

module.exports = {
  loginUserSchema,
  createUserSchema,
};
