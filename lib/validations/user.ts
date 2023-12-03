import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Mínimo 3 carácteres." })
    .max(30, { message: "Máximo 30 carácteres." }),
  username: z
    .string()
    .min(3, { message: "Mínimo 3 carácteres." })
    .max(30, { message: "Máximo 30 carácteres." }),
  bio: z
    .string()
    .min(3, { message: "Mínimo 3 carácteres." })
    .max(1000, { message: "Máximo 1000 carácteres." }),
});
