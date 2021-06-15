/*eslint-env browser*/
/*global browser*/

console.log("Content.js loaded");

browser.runtime.onMessage.addListener((msg)=>{
	if(msg.action === "run"){
		const cnvs = document.getElementById("mixed-chart");
		const imgArr = cnvs.getContext("2d").getImageData(0, 0, cnvs.width, cnvs.height).data;
		const imgDat = cnvs.getContext("2d").getImageData(0, 0, cnvs.width, cnvs.height);
		for(let i = 0, len = imgArr.length; i < len; i+=4){
			if(imgArr[i + 3] < 10){
				imgArr[i] = imgArr[i + 1] = imgArr[i + 2] = imgArr[i + 3] = 255;
				imgDat.data[i] = imgDat.data[i + 1] = imgDat.data[i + 2] = imgDat.data[i + 3] = 255;
			}
			imgArr[i + 2] = Math.round(imgArr[i + 2] * 0.5 + 127);
			imgDat.data[i + 2] = Math.round(imgDat.data[i + 2] * 0.5 + 127);
		}
		const hCnvs = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
		hCnvs.width = cnvs.width;
		hCnvs.height = cnvs.height;
		hCnvs.mozOpaque = true;
		const hCnvsCtx = hCnvs.getContext("2d");
		debugger;
		const newImgDat = new ImageData(imgArr, cnvs.width);
		const diff = newImgDat.data.reduce((a, x, i)=>a+Math.abs(x - imgDat.data[i]), 0);
		console.log("Diff btwn 2 approaches: ", diff);
		console.log("Before a crash...");
		hCnvsCtx.putImageData(newImgDat, 0, 0);
		// hCnvsCtx.putImageData(imgDat, 0, 0);
		console.log("I have not crashed");
	}
});

