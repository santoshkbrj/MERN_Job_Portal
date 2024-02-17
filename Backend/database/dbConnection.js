import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_JOB_SEEKING"
    }).then(() => {
        console.log("connect to database")
    }).catch((err) => {
        console.log(`some error occure while connecting to database: ${err}`)
    })
}