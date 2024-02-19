import * as yup from "yup";

const envSchema = yup.object({
  NEXT_PUBLIC_CLIENT_ID: yup.string().required(),
  NEXT_PUBLIC_CLIENT_SECRET: yup.string().required(),
});

type PartialEnv = Partial<yup.InferType<typeof envSchema>>;
const partialEnv: PartialEnv = {
  NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
  NEXT_PUBLIC_CLIENT_SECRET: process.env.NEXT_PUBLIC_CLIENT_SECRET,
};

export const env = envSchema.validateSync(partialEnv);
