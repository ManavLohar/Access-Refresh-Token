import "dotenv/config";

if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error(
    "!JWT_ACCESS_SECRET is not defined in environment variables!",
  );
}
if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error(
    "!JWT_REFRESH_SECRET is not defined in environment variables!",
  );
}
if (!process.env.PORT) {
  throw new Error("!PORT is not defined in environment variables!");
}

export const config = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  PORT: process.env.PORT,
};
