module.exports = {
  apps: [
    {
      name: "NCKH",
      script: "./index.js",
      env: {
        PORT: 3000,
        JWT_SECRET: "15a2740d087c69fa141be1278b4bc1ca",
        MONGO_URI: "mongodb://localhost:27017/nckh",
      },
      env_staging: {
        PORT: 3000,
        JWT_SECRET: "15a2740d087c69fa141be1278b4bc1ca",
        MONGO_URI: "mongodb://localhost:27017/nckh",
      },
    },
  ],
};
