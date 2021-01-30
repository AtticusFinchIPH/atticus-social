import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import config from "./config";
import path from "path";
import cors from 'cors';
import User from "./models/userModel";
import userRoute from "./routes/userRoute";
import postRoute from "./routes/postRoute";

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.get("/api", (req, res) => {
    res.send("Test api successful");
});

switch (config.ENVIRONMENT) {
    case 'PROD':
        /*  Serve static files from the React frontend app
        Anything that doesn't match the above, send back index.html */
        app.use(express.static(path.join(__dirname, '/../frontend/build')))
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
        })
        break;
    default:
        break;
}


app.listen(config.PORT, () => {
    main();
})

const main = () => {
    console.log(`Server started at http://localhost:${config.PORT}`);
    const createInitialAdmin = async () => {
        try {
            const findAdmin = await User.findOne({
                email: 'tranvanduc@gmail.com'
            })
            if(findAdmin) return;
            const user = new User({
                firstName: 'atticus',
                lastName: 'finch',
                nickName: 'atticus finch',
                email: 'tranvanduc@gmail.com',
                password: 'admin',
                isAdmin: true
            });
            const newUser = await user.save();
            return;
        } catch (error) {
            console.log(error);
        }
    }
    createInitialAdmin();
}