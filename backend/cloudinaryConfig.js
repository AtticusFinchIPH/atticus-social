import cloudinary from 'cloudinary';
import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';
import config from "./config";

cloudinary.v2.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: config.CLOUDINARY_FOLDER,
    }
});

const parser = multer({ storage: storage });
export default {
    parser,
}