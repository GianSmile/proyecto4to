import express from "express";

import cookieParser from "cookie-parser";

import router from "./router";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});