import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    SOCKET_PORT: process.env.SOCKET_PORT || 5001,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/atticus-social',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    USER_IMAGES_PATH: process.env.USER_IMAGES_PATH || '/../../frontend/public/userImages',
}