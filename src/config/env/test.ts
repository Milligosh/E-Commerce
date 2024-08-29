import { configDotenv } from 'dotenv';
configDotenv();

const test = {...process.env,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
    PORT: process.env.PORT,};

export default test;
