import { configDotenv } from 'dotenv';
configDotenv();

const development = { ...process.env,
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    EMAIL_SERVICE:process.env.EMAIL_SERVICE,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS:process.env.EMAIL_PASS
};

export default development;
