import * as PImage from "pureimage";
import * as fs from "fs";
import { measureText } from "pureimage/src/text.js";

// make image
const img = await PImage.decodeJPEGFromStream(fs.createReadStream("background.jpeg"));

// get canvas context
const ctx = img.getContext("2d");
await new Promise((resolve, reject) => PImage.registerFont("./BakbakOne-Regular.ttf", "Bakbak").load(resolve));

const time = (() => {
    let timeNow = Date.now();
    let nextChristmas = new Date("Dec 25 " + (new Date().getMonth() === 11 && new Date().getDay() >= 25 ? new Date().getFullYear() + 1 : new Date().getFullYear())).getTime();

    let time = nextChristmas - timeNow;
    let toReturn = "";

    if(Math.floor(time / (1000 * 60 * 60 * 24))) {
        toReturn += Math.floor(time / (1000 * 60 * 60 * 24)) + " Days ";
        time -= Math.floor(time / (1000 * 60 * 60 * 24)) * 1000 * 60 * 60 * 24;
    }
    if(Math.floor(time / (1000 * 60 * 60))) {
        toReturn += Math.floor(time / (1000 * 60 * 60)) + " Hours ";
        time -= Math.floor(time / (1000 * 60 * 60)) * 1000 * 60 * 60;
    }
    if(Math.floor(time / (1000))) {
        toReturn += Math.floor(time / (1000 * 60)) + " Minutes ";
        time -= Math.floor(time / (1000 * 60)) * 1000 * 60;
    }
    if(Math.floor(time / (1000))) {
        toReturn += Math.floor(time / (1000 )) + " Seconds ";
        time -= Math.floor(time / (1000)) * 1000;
    }

    return toReturn;
})();

ctx.fillStyle = "black";
ctx.font = "30px Bakbak";
ctx.textAlign = "center";
ctx.fillText(time, img.width / 2, 100);
ctx.font = "75px Bakbak";
ctx.fillText("Until Christmas", img.width / 2, 200);

//write to "out.png"
PImage.encodePNGToStream(img, fs.createWriteStream("out.png")).then(() => {
    console.log("wrote out the png file to out.png");
}).catch((e)=>{
    console.log("there was an error writing");
});