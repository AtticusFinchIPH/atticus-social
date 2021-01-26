import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/atticus-social',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    USER_IMAGES_PATH: process.env.USER_IMAGES_PATH || '/../../frontend/public/userImages',
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_FOLDER: process.env.ENV === 'PROD' ? "atticus-social/prod" : "atticus-social/dev",
}