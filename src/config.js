module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/doggo',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    S3_KEY: process.env.S3_KEY,
    S3_SECRET: process.env.S3_SECRET
  }