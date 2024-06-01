
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import adminRouter from "./routes/admin.route.js"
import courseRouter from "./routes/course.route.js"
import studentRouter from "./routes/student.route.js"
import franchiseRouter from "./routes/franchise.route.js"
import messageRouter from "./routes/message.route.js"


app.use("/api/admin", adminRouter);
app.use("/api/course", courseRouter);
app.use("/api/student", studentRouter);
app.use("/api/franchise", franchiseRouter);
app.use("/api/message", messageRouter);


export { app }