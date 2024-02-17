import app from "./app.js";
import cloudinary from 'cloudinary'

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is running on PORT ${port}`);
});
