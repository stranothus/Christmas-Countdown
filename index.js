import express from "express";
import updateImage from "./updateImage.js";

const app = express();

app.use(async (req, res) => {
    await updateImage();

    res.sendFile(process.cwd() + "/out.png");
});

app.listen(3030);