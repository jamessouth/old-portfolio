const main = document.querySelector('main');
const pb = document.querySelectorAll('.photo-cube');
const cc = document.querySelectorAll('.cube-container');
const body = document.querySelector('body');
const menuIcon = document.querySelector('.hamburger');
const projectNotesIcon = document.querySelector('.star');
const table = document.querySelector('.overlay2 .table');
const featureTable = table.querySelector('table');
const tableTDs = featureTable.querySelectorAll('td');
const tableTHSpans = featureTable.querySelectorAll('thead th span');
const tableCloseButton = document.querySelector('.overlay2 .table button');
const tablePlayPauseButton = document.querySelector('.overlay2 .table button.play_pause');
const tableChecks = featureTable.querySelectorAll('img[alt="check"]');
const pauseExplain = document.querySelector('#pauseexplain');
const canvas = document.querySelector('canvas#board');
const canvasholder = document.querySelector('.canvasholder');
const sizeInput = document.querySelector('.menu-hold .slider input');
const sizeInputP = document.querySelector('.menu-hold .slider p');
const sizeTrack = document.querySelector('.menu-hold .slider .track');
const overlay = document.querySelector('div.overlay');
const overlay2 = document.querySelector('div.overlay2');
const overlayCloseButton = overlay.querySelector('button.close');
const overlayNextButton = overlay.querySelector('button.next');
const overlayPrevButton = overlay.querySelector('button.prev');
const overlayContactButton = overlay.querySelector('button.contact');
const menuHolder = document.querySelector('.menu-hold ul');
const options = document.querySelectorAll('.menu-hold ul li');
const menuHold = document.querySelector('.menu-hold');
const overlayButtons = document.querySelectorAll('.overlay > button');
const hold = main.querySelector('div.hold');
const flipSwitch = document.querySelector('.menu-hold div.flip-switch');
const radioLinear = flipSwitch.querySelector('input[id="linear"]');
const radioCurved = flipSwitch.querySelector('input[id="curved"]');
const switchHolder = flipSwitch.querySelector('div.rect-prism-container');
const theSwitch = flipSwitch.querySelector('div.switch-rect');
const switchBottom = theSwitch.querySelector('div.switch-bottom');
const switchLeft = theSwitch.querySelector('div.switch-left');
const check = document.querySelectorAll('.menu-hold input.check');
const checkLabel = document.querySelectorAll('.menu-hold input.check + label');
const subhead = hold.querySelectorAll('.subhead:nth-of-type(odd)');
const desc = hold.querySelectorAll('.subhead:nth-of-type(even)');
const liOverlay = menuHolder.querySelectorAll('.li-overlay');
const cubeLinks = document.querySelectorAll('div.cube-container div.photo-cube div a');
let destroyFlag = false;
const explode = document.querySelectorAll('.explode');
const headline = main.querySelector('h1');
const seconds = document.querySelector('.menu-hold select');
const secondsLabel = document.querySelector('.menu-hold label[for="sec"]');
const secondsP = document.querySelector('.menu-hold ul li p.seconds');
const canvasbuttons = document.querySelectorAll('.canvasbuttons button');
const faderCanv = document.querySelector('.canvasbuttons #fader');
const linksDiv = document.querySelector('.canvasbuttons #contactinfolinks');
const linksDivLinks = document.querySelectorAll('.canvasbuttons #contactinfolinks a');
const clickCounter = document.querySelector('.canvasbuttons .clickCounter p:last-of-type');
const helpText = document.querySelector('.canvasbuttons .help');
const proj3 = pb[0].querySelector('.right');
const proj4 = pb[0].querySelector('.back');
const proj7 = pb[1].querySelector('.front');
const proj9 = pb[1].querySelector('.right');
const proj10 = pb[1].querySelector('.back');
const proj11 = pb[1].querySelector('.top');
// let classToAdd = '';

menuIcon.hamb = true;
projectNotesIcon.hamb = false;
overlayCloseButton.over = true;
tableCloseButton.over = false;

let ctx = canvas.getContext('2d');
let ctxFader = faderCanv.getContext('2d');
let depths = [0, -2000, -3250, -4500];
let rotations = [0, 1, 2, 3];
let descs = ['personal profile page', 'responsive layout', 'registration form', 'photo gallery', 'sass refactor of project 2', 'svg site update', 'interactive video player', 'accessibility refactor', 'web app dashboard', 'employee directory', 'react flickr gallery', 'portfolio'];
let switchFlag = true;
let nextAnims = ['applyAnimFTB', 'applyAnimMFTF', 'applyAnimMBTMF', 'applyAnimBTMB'];
let prevAnims = ['applyAnimFTMF', 'applyAnimMFTMB', 'applyAnimMBTB', 'applyAnimBTF'];
let boxes = [];
let t = 0;
let t2 = 0;
let t3 = 0;
let shades = [];
let canvArray = [];
// let image0 = new Image();
// let image1 = new Image();
// let image2 = new Image();
// let image3 = new Image();
// let image4 = new Image();
// let image5 = new Image();
// let image6 = new Image();
// let image7 = new Image();
// let image8 = new Image();
// let image9 = new Image();
// let image10 = new Image();
// let image11 = new Image();
// let image12 = new Image();
// let image13 = new Image();
// let image14 = new Image();
// let image15 = new Image();
let contact = new Image();
let clicks = 0;
let isRotating = false;
let xStart;
let yStart;
let xEnd;
let yEnd;
let whichPB = 0;
let rotObj = {
	0 : {
		x : 0,
		y : 0,
		xs : 0,
		ys : 0
	},
	1 : {
		x : 0,
		y : 0,
		xs : 0,
		ys : 0
	}
};
check[0].checked = false;
check[1].checked = false;
check[0].setAttribute('aria-checked', false);
check[1].setAttribute('aria-checked', false);
seconds.value = 0;
[...seconds.children].forEach(x => x.setAttribute('aria-selected', false));
seconds.children[0].setAttribute('aria-selected', true);
sizeInput.value = 220;
sizeInput.setAttribute('aria-valuenow', 220);
radioLinear.checked = true;
radioLinear.setAttribute('aria-checked', true);

// let thou = 1020;
// let sideOrder = [3, 1, 2, 5, 4, 0];

// let ppp = new Image();
// ppp.onload = (() => console.log('loaded image'));
// ppp.src = 'images/p1a.jpg';

// function formCubes(timeStamp){
//
// 	ooo = requestAnimationFrame(formCubes);
// 	console.log('drawing');
//   if(t3 < sideOrder.length && timeStamp > ((t3 + 1) * thou)){
// 		pb[0].children[sideOrder[t3]].classList.add('first');
// 		pb[1].children[sideOrder[t3]].classList.add('second');
// 		console.log(timeStamp, t3);
//     t3++;
// 		thou *= .9;
// 		if(t3 === sideOrder.length){
// 			cancelAnimationFrame(ooo);
// 			pb[0].classList.add('anim-cube');
// 			pb[1].classList.add('anim-cube');
// 		}
//
// 	}
//
// };
//
// let ooo = requestAnimationFrame(formCubes);


// fetch('images/explosion.gif')
// .then(res => {
// 	// console.log(res.type, res.status, res.statusText, res.url);
// 	return res.status !== 200 ? console.log('there was a problem fetching the resource. Status Code and Text: ' + res.status, res.statusText) : res.blob();
// })
// .then(res => {
// 	// console.log(res, typeof res);
// 	var objectURL = URL.createObjectURL(res);
// 	explode[0].src = objectURL;
// 	explode[1].src = objectURL;
// })
// .catch(err => console.log('Fetch error: ', err));

let KEYFRAMES = {
  one: [
		{transform: 'rotateY(0deg) rotateX(18deg)'},
    {transform: 'rotateY(90deg) rotateX(18deg)'}
  ],
  two: [
		{transform: 'rotateY(90deg) rotateX(18deg)'},
    {transform: 'rotateY(-90deg) rotateX(18deg)'}
  ],
  three: [
    {transform: 'rotate(0deg)'},
    {transform: 'rotate(200deg)'},
    {transform: 'rotate(0deg)'}
  ],
  four: [
    {background: '#4598b6'},
    {background: '#444444'},
    {background: '#4598b6'}
  ],
  five: [
    {background: '#b64598'},
    {background: '#444444'},
    {background: '#b64598'}
  ]
};

let KEYTIMING = {duration: 2000, iterations: 1, delay: 1000, fill: 'none', easing: 'ease-in-out'};

let anims = ['one', 'two', 'three', 'four', 'five'];
let no = 1, num = 0;
async function buildCubes(){
	let pic, pic2;
	try{
		pic = await fetch(`images/project${no}.jpg`);
		pic2 = await fetch(`images/project${no + 6}.jpg`);
		console.log(pic, no, no+6);
		pic = await pic.blob();
		pic2 = await pic2.blob();
		console.log(pic, typeof pic);
		var objectURL = URL.createObjectURL(pic);
		var objectURL2 = URL.createObjectURL(pic2);
		console.log(objectURL);
		pb[0].children[no - 1].style.backgroundImage = `url(${objectURL})`;
		pb[1].children[no - 1].style.backgroundImage = `url(${objectURL2})`;
		no++;
	}
	catch(err){
		console.log('error', err);
	}
	// return pic;
}

buildCubes().then(animCubes).then(buildCubes).then(animCubes);

function animCubes(){
	console.log('about to animate... ' + num);
	let animOne = pb[0].animate(KEYFRAMES[anims[num]], KEYTIMING);
	let animOne2 = pb[1].animate(KEYFRAMES[anims[num]], KEYTIMING);
	console.log(animOne);
	num++;
	return Promise.all([animOne.finished, animOne2.finished]);
}






// .then((res) => {
// 	// console.log(res);
// 	console.log('about to animate 2...');
// 	let animTwo = pb[0].animate(KEYFRAMES.three, {duration: 1000, iterations: 3, delay: 1000, easing: 'ease-in-out'});
// 	console.log(res);
// })



console.log('here');













function panorama(timeStamp){

	mmm = requestAnimationFrame(panorama);
	// console.log('drawing');

  // if(t3 < sideOrder.length && timeStamp > ((t3 + 1) * 1000)){
	// 	pb[0].children[sideOrder[t3]].classList.add('first');
	// 	pb[1].children[sideOrder[t3]].classList.add('second');
	// 	console.log(timeStamp, t3);
  //   t3++;
	// 	t3 === sideOrder.length && cancelAnimationFrame(mmm);
	// }

	tableCtx.clearRect(0, 0, clearX, clearY);

	if(CanvasYSize + tableImageY < dy) {
			tableImageY = imgH - CanvasYSize;
			// console.log(tableImageY, imgH, CanvasYSize);
			// tableCtx.drawImage(tableImg, 0, (imgH + tableImageY), imgW, CanvasYSize,
			// 0, 0, CanvasXSize, CanvasYSize);

	}

	if(tableImageY < 0) {
			// tableImageY = imgH - CanvasYSize;
			// console.log(tableImageY, imgH, CanvasYSize);
			tableCtx.drawImage(tableImg, 0, (imgH + tableImageY), imgW, CanvasYSize,
			0, 0, CanvasXSize, CanvasYSize);

	}


	tableCtx.drawImage(tableImg, 0, tableImageY, imgW, CanvasYSize,
	0, 0, CanvasXSize, CanvasYSize);

// console.log(tableImg, 0, tableImageY, imgW, CanvasYSize,0, 0, CanvasXSize, CanvasYSize);

// console.log(tableImageY);
	tableImageY -= dy;




};











// 'modified from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations'
let tableImg = new Image();
// let imgHolder = [];

let sources = {
	'bluecloud': null, 'cloudvert': null, 'fire': null, 'greyclouds': null, 'jupiter': null, 'mars': null, 'moon': null, 'pano': null, 'rapid': null, 'shallow': null
};


// let sourcesSet = new Set();
let tableSource;


let CanvasXSize = 310;
let CanvasYSize = 423;
let speed = 2; //higher scrolls faster
let tableImageY = 0;
let dy = speed;
let imgW;
let imgH;
let tableImageX = 0;
let clearX = CanvasXSize;
let clearY = CanvasYSize;
let tableCtx = table.querySelector('canvas#scroll').getContext('2d');
// let intrvl;
let myImageData;

// function animTableCanvas(){
//
//
//
//
//     // if (imgH > CanvasYSize) {
//     //     clearY = imgH;
// 		// 		// console.log(clearY);
//     // } else {
//     //
// 		// 		// console.log(clearY);
//     // }
// 		// console.log(clearX, clearY);
//     // tableCtx
//
//
//     // intrvl = setInterval(draw, speed);
// };
// let cntr = 0;


// window.setInterval(() => {console.log('3 second');}, 3000);


// function draw() {
// 		// console.log('drawing');
// 		// cntr++;
// 		// if(cntr % 333 === 0){
// 		// 	console.log(cntr);
// 		// }
//
//
//     if (tableImageY > (CanvasYSize-imgH)) {
//         tableCtx.drawImage(tableImg, tableImageX, tableImageY - imgH, imgW, imgH);
// 				// console.log(tableImageY, tableImageY - imgH);
//     }
//
// 		// console.log(tableImageY);
// 		// myImageData = tableCtx.getImageData(155, 34, 1, 1);
// 		// if(myImageData.data[3] !== 255){
// 		// 	console.log(myImageData.data);
// 		// }
//
// 		// featureTable.style.borderColor = `rgba(${myImageData.data[0]}, ${myImageData.data[1]}, ${myImageData.data[2]}, 255)`;
//
// }


// featureTable.addEventListener('focus', function(e){
// 	this.firstElementChild.style.color = 'white';
// });
//
// featureTable.addEventListener('blur', function(e){
// 	this.firstElementChild.style.color = 'black';
// });




function clearTable(){
	tableTDs.forEach(c => c.classList.remove('highlight'));
	tableTHSpans.forEach(h => h.classList.remove('highlightText'));
}


function handleTableHighlight(e){
	clearTable();
	let featureColumn;
	if(e.target.tagName === 'TD' || e.target.tagName === 'IMG'){
		if(e.target.headers){
			featureColumn = e.target.headers.split(' ')[1];
			// console.log(featureColumn);
		} else {
			featureColumn = e.target.parentNode.headers.split(' ')[1];
			// console.log(featureColumn);

		}
		let highlightedCol = this.querySelectorAll(`td[headers*=${featureColumn}]`);
		// console.log(highlightedCol);
		let highlightedHeader = this.querySelector(`th[id=${featureColumn}] span`)
		highlightedCol.forEach(x => x.classList.add('highlight'));
		highlightedHeader.classList.add('highlightText');
	}

};

featureTable.addEventListener('mouseover', handleTableHighlight);
featureTable.addEventListener('mouseout', clearTable);




['mouseover', 'focus', 'touchstart'].forEach(evt => {
	pb.forEach((x,i) => {
		x.addEventListener(evt, e => {
			if(e.target.tagName === 'A'){
				let projNum = e.target.id;
				subhead[i].textContent = 'Project ' + projNum;
				desc[i].textContent = descs[projNum - 1];
			}
		}, true);
	});
});
check[0].addEventListener('change', function(e){
	if(e.target.checked){
		checkLabel[0].textContent = 'GIFs!';
		this.setAttribute('aria-checked', true);
		proj3.style.backgroundImage = 'url("images/p3.gif")';
		proj4.style.backgroundImage = 'url("images/p4.gif")';
		proj7.style.backgroundImage = 'url("images/p7.gif")';
		proj9.style.backgroundImage = 'url("images/p9.gif")';
		proj10.style.backgroundImage = 'url("images/p10.gif")';
		proj11.style.backgroundImage = 'url("images/p11.gif")';
	} else {
		checkLabel[0].textContent = 'no GIFs';
		this.setAttribute('aria-checked', false);
		proj3.style.backgroundImage = 'url("images/project3.jpg")';
		proj4.style.backgroundImage = 'url("images/project4.jpg")';
		proj7.style.backgroundImage = 'url("images/project7.jpg")';
		proj9.style.backgroundImage = 'url("images/project9.jpg")';
		proj10.style.backgroundImage = 'url("images/project10.jpg")';
		proj11.style.backgroundImage = 'url("images/project11.jpg")';
	}
});
check[1].addEventListener('change', function(e){
	if(e.target.checked){


		fetch('images/explosion.gif')
		.then(res => {
			// console.log(res.type, res.status, res.statusText, res.url);
			return res.status !== 200 ? console.log('there was a problem fetching the resource. Status Code and Text: ' + res.status, res.statusText) : res.blob();
		})
		.then(res => {
			// console.log(res, typeof res);
			var objectURL = URL.createObjectURL(res);
			explode[0].src = objectURL;
			explode[1].src = objectURL;
		})
		.catch(err => console.log('Fetch error: ', err));





		checkLabel[1].textContent = 'DESTROY!';
		this.setAttribute('aria-checked', true);
		destroyFlag = true;
		seconds.style.filter = 'blur(0px)';
		secondsLabel.style.filter = 'blur(0px)';
		secondsP.style.filter = 'blur(0px)';
		seconds.removeAttribute('disabled');
		seconds.setAttribute('aria-disabled', false);
		seconds.tabIndex = "1";
	} else {
		checkLabel[1].textContent = 'do not destroy';
		this.setAttribute('aria-checked', false);
		destroyFlag = false;
		seconds.style.filter = 'blur(30px)';
		secondsLabel.style.filter = 'blur(30px)';
		secondsP.style.filter = 'blur(30px)';
		seconds.setAttribute('disabled', '');
		seconds.setAttribute('aria-disabled', true);
		seconds.tabIndex = "-1";
	}
});
function tabIndMgr(i){
	options[i].tabIndex = "-1";
	seconds.tabIndex = "-1";
	let thisInput = options[i].querySelectorAll('input');
	if(thisInput[1]){
		thisInput[1].tabIndex = "-1";
	}
	thisInput[0].tabIndex = "-1";
}
function tabIndMgrCurrentItem(i){
	options[i].tabIndex = "1";
	let thisInput = options[i].querySelectorAll('input');
	if(thisInput[1] && thisInput[0].checked){
		thisInput[0].tabIndex = "1";
		thisInput[1].tabIndex = "-1";
	} else if(thisInput[1] && thisInput[1].checked){
		thisInput[0].tabIndex = "-1";
		thisInput[1].tabIndex = "1";
	} else {
		thisInput[0].tabIndex = "1";
	}
	if(thisInput[0].id === 'destroy' && destroyFlag){
		seconds.tabIndex = "1";
	}
}
function styleMgr(i){
	if(parseInt(options[i].style.transform.match(/(-?\d+)(?=px\)$)/)[0], 10) === -4500){
		options[i].style.opacity = '0.3';
		liOverlay[i].style.display = 'block';
		tabIndMgr(i);
	} else if(parseInt(options[i].style.transform.match(/(-?\d+)(?=px\)$)/)[0], 10) === -3250){
		options[i].style.opacity = '0.45';
		liOverlay[i].style.display = 'block';
		options[i].tabIndex = "-1";
	} else if(parseInt(options[i].style.transform.match(/(-?\d+)(?=px\)$)/)[0], 10) === -2000){
		options[i].style.opacity = '0.65';
		liOverlay[i].style.display = 'block';
		tabIndMgr(i);
	} else {
		options[i].style.opacity = '1';
		liOverlay[i].style.display = 'none';
		tabIndMgrCurrentItem(i);
	}
}
function handleLinearTransInit(){
 for(let i = 0; i < options.length; i++){
	 options[i].className = '';
	 if(options[i].dataset.pos === '0'){
		 options[i].style.transform = `rotateX(0deg) translateY(-180px) translateZ(${depths[i]}px)`;
	 } else {
		 options[i].style.transform = `rotateX(5deg) translateY(-180px) translateZ(${depths[i]}px)`;
	 }
	 styleMgr(i);
 }
}
function handleCurvedTransInit(){
	for(let i = 0; i < options.length; i++){
		let menuCard = options[i];
		liOverlay[i].style.display = 'none';
		menuCard.style.opacity = '1';
		if(menuCard.dataset.pos === '0'){
			menuCard.style.transform = 'rotateX(0deg) translateY(-180px) translateZ(0px)';
			tabIndMgrCurrentItem(i);
		} else if(menuCard.dataset.pos === '1'){
			menuCard.style.transform = 'rotateX(30deg) translateY(-180px) translateZ(0px)';
			tabIndMgr(i);
		} else if(menuCard.dataset.pos === '2'){
			menuCard.style.transform = 'rotateX(40deg) translateY(-180px) translateZ(0px)';
			menuCard.tabIndex = "-1";
		} else {
			menuCard.style.transform = 'rotateX(50deg) translateY(-180px) translateZ(0px)';
			tabIndMgr(i);
		}
	}
}
function handleCurvedTransNextPrev(){
	for(let i = 0; i < options.length; i++){
		let menuCard = options[i];
		if(menuCard.dataset.pos === '0'){
			tabIndMgrCurrentItem(i);
		} else if(menuCard.dataset.pos === '1'){
			tabIndMgr(i);
		} else if(menuCard.dataset.pos === '2'){
			menuCard.tabIndex = "-1";
		} else {
			tabIndMgr(i);
		}
	}
}
flipSwitch.addEventListener('click', function(e){
	if(e.target.tagName === 'LABEL'){
		e.preventDefault();
	}
	if(switchFlag){
		radioCurved.checked = true;
		radioLinear.setAttribute('aria-checked', false);
		radioCurved.setAttribute('aria-checked', true);
		switchHolder.style.margin = '22px 0 0 5px';
		theSwitch.style.transform = 'rotateX(57deg) rotateY(13deg) rotateZ(-19deg)';
		switchBottom.style.borderTopWidth = '3px';
		switchBottom.style.borderBottomWidth = '4px';
		switchLeft.style.borderRightWidth = '3px';
		switchLeft.style.borderLeftWidth = '4px';
		switchLeft.style.borderTopWidth = '3px';
		radioLinear.blur();
		radioCurved.focus();
		handleCurvedTransInit();
		switchFlag = false;
	} else {
		radioLinear.checked = true;
		radioCurved.setAttribute('aria-checked', false);
		radioLinear.setAttribute('aria-checked', true);
		switchHolder.style.margin = '7px 0 0 -1px';
		theSwitch.style.transform = 'rotateX(125deg) rotateY(-13deg) rotateZ(-19deg)';
		switchBottom.style.borderTopWidth = '4px';
		switchBottom.style.borderBottomWidth = '3px';
		switchLeft.style.borderRightWidth = '5px';
		switchLeft.style.borderLeftWidth = '3px';
		switchLeft.style.borderTopWidth = '4px';
		radioCurved.blur();
		radioLinear.focus();
		handleLinearTransInit();
		switchFlag = true;
	}
});
function handleSelectUpdate() {
	[...this.children].forEach(x => x.setAttribute('aria-selected', false));
	this.children[this.value].setAttribute('aria-selected', true);
	const suffix = this.dataset.sizing;
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}
seconds.addEventListener('change', handleSelectUpdate);
sizeInput.addEventListener('focus', function(e){
	this.parentNode.style.border = "3px white solid";
});
sizeInput.addEventListener('blur', function(e){
	this.parentNode.style.border = "none";
});
[radioLinear, radioCurved].forEach(x => x.addEventListener('focus', function(e){
	this.parentNode.style.boxSizing = "content-box";
	this.parentNode.style.border = "3px white solid";
}));
[radioLinear, radioCurved].forEach(x => x.addEventListener('blur', function(e){
	this.parentNode.style.border = "none";
	this.parentNode.style.boxSizing = "border-box";
}));
function handleRangeUpdate() {
	const suffix = this.dataset.sizing;
	const width = this.max - this.min;
	const perc = Math.floor(((this.value - width) / width) * 100) / 100;
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
	this.setAttribute('aria-valuenow', this.value);
	sizeInputP.textContent = `<\u00A0\u00A0\u00A0${this.value}px\u00A0\u00A0\u00A0>`;
	sizeTrack.style.width = `${perc * 142}px`;
	sizeTrack.style.backgroundColor = `hsl(${perc * 720}, 65%, 30%)`;
}
sizeInput.addEventListener('change', handleRangeUpdate);
sizeInput.addEventListener('mousemove', handleRangeUpdate);
function handleMenu(e){
	if(e.type === 'keydown'){
		if(e.key.toLowerCase() === 'tab' || e.keyCode === 9){
			return;
		} else if(e.key.toLowerCase() === 'enter' || e.keyCode === 13){

		} else if(e.key.toLowerCase() === ' ' || e.keyCode === 32){
			e.preventDefault();

		} else {
			e.preventDefault();
			return;
		}
	}


	[...cubeLinks, menuIcon, projectNotesIcon].forEach(x => {
		x.tabIndex = "-1";
		x.setAttribute('aria-hidden', true);
	});
	// menuIcon.tabIndex = "-1";
	// menuIcon.setAttribute('aria-hidden', true);
	// projectNotesIcon.tabIndex = "-1";
	// projectNotesIcon.setAttribute('aria-hidden', true);
	this.blur();
	headline.setAttribute('aria-hidden', true);
	[main, menuIcon, projectNotesIcon, subhead[0], subhead[1], desc[0], desc[1]].forEach(w => w.style.opacity = '0.35');

	// main.style.opacity = '0.35';
	// menuIcon.style.opacity = '0.35';
	// projectNotesIcon.style.opacity = '0.35';
	// for(let i = 0; i < subhead.length; i++){
	// 	subhead[i].style.opacity = '0.35';
	// 	desc[i].style.opacity = '0.35';
	// }



	// console.log(this, this.hamb);

	if(this.hamb){



		// image0.src = 'images/00.jpg';
		// image1.src = 'images/01.jpg';
		// image2.src = 'images/02.jpg';
		// image3.src = 'images/03.jpg';
		// image4.src = 'images/10.jpg';
		// image5.src = 'images/11.jpg';
		// image6.src = 'images/12.jpg';
		// image7.src = 'images/13.jpg';
		// image8.src = 'images/20.jpg';
		// image9.src = 'images/21.jpg';
		// image10.src = 'images/22.jpg';
		// image11.src = 'images/23.jpg';
		// image12.src = 'images/30.jpg';
		// image13.src = 'images/31.jpg';
		// image14.src = 'images/32.jpg';
		// image15.src = 'images/33.jpg';
		contact.src = 'images/contact.jpg';




		this.children[0].classList.add('top-bun');
		this.children[2].classList.add('bottom-bun');
		overlay.style.display = 'flex';
		if(switchFlag){
			handleLinearTransInit();
		} else {
			handleCurvedTransInit();
		}
		setTimeout(() => {
			overlayContactButton.focus();
		}, 400);


	} else {




		overlay2.style.display = 'block';
		if(tablePlayPauseButton.getAttribute('aria-pressed') === 'false'){
			// tablePlayPauseButton.classList.add('pause');
			// tablePlayPauseButton.classList.remove('play');
			tablePlayPauseButton.className = 'play_pause pause';
			// setTimeout(animTableCanvas, 1000);
			// animTableCanvas();

			tableChecks.forEach(c => c.src = 'images/check.png');
			// console.log(Object.keys(sources));

			tableSource = Object.keys(sources)[Math.floor(Math.random() * Object.keys(sources).length)];


			if(!sources[tableSource]){
				let newImg = new Image();

				newImg.onload = function(){
					imgW = this.width;
					imgH = this.height;
					tableImageY = imgH - CanvasYSize;
				}


				newImg.src = `images/${tableSource}.jpg`;
				sources[tableSource] = newImg;

				tableImg = sources[tableSource];

			} else {
				tableImg = sources[tableSource];
				imgW = tableImg.width;
				imgH = tableImg.height;
				tableImageY = imgH - CanvasYSize;
			}




			let mmm = requestAnimationFrame(panorama);


		}

	}

}
['click', 'keydown'].forEach(evt => {
	menuIcon.addEventListener(evt, handleMenu);
	projectNotesIcon.addEventListener(evt, handleMenu);
});


function flipCards(anims){
	for(let i = 0; i < options.length; i++){
		if(options[i].dataset.pos === '0'){
			options[i].className = anims[0];
		} else if(options[i].dataset.pos === '1'){
			options[i].className = anims[1];
		} else if(options[i].dataset.pos === '2'){
			options[i].className = anims[2];
		} else {
			options[i].className = anims[3];
		}
	}
}
function destroyCube(cube){
	cube.addEventListener('animationend', () => {
		headline.style.marginBottom = '0';
		cube.style.display = 'none';
		cube.parentNode.style.display = 'none';
		for(let i = 0; i < 2; i++){
			subhead[i].style.display = 'none';
			desc[i].style.display = 'none';
		}
		if(window.innerWidth < 768){
			explode[0].style.display = 'block';
			explode[0].style.width = '560px';
			explode[0].style.height = '420px';
			explode[0].style.marginTop = `${-167 + (document.documentElement.clientHeight / 2) - 210}px`;
		} else {
			explode[0].style.display = 'block';
			explode[1].style.display = 'block';
			explode[0].style.marginTop = `${((sizeInput.value - 220) / 3) + 26}px`;
			explode[1].style.marginTop = `${((sizeInput.value - 220) / 3) + 0}px`;
		}
	});
	menuIcon.style.display = 'none';
	projectNotesIcon.style.display = 'none';
	cube.classList.add('blowup');
	window.setTimeout(() => {
		explode[0].style.display = 'none';
		explode[1].style.display = 'none';
	}, (seconds.value * 1000) + 5490);
}


function handleClose(e){
	// console.log(this, this.over);

	[...cubeLinks, menuIcon, projectNotesIcon].forEach(x => {
		x.tabIndex = "0";
		x.removeAttribute('aria-hidden');
	});
	headline.removeAttribute('aria-hidden');
	[main, menuIcon, projectNotesIcon, subhead[0], subhead[1], desc[0], desc[1]].forEach(w => w.style.opacity = '1');

	// main.style.opacity = '1';
	// menuIcon.style.opacity = '1';
	// projectNotesIcon.style.opacity = '1';

	// for(let i = 0; i < subhead.length; i++){
	// 	subhead[i].style.opacity = '1';
	// 	desc[i].style.opacity = '1';
	// }


	if(this.over){
		overlay.style.display = 'none';
		menuIcon.children[0].classList.remove('top-bun');
		menuIcon.children[2].classList.remove('bottom-bun');


		for(let i = 0; i < options.length; i++){
			options[i].className = '';
			options[i].style.transform = '';
		}
		if(destroyFlag){
			destroyCube(pb[0]);
			destroyCube(pb[1]);
		}
		menuIcon.focus();


	} else {
		overlay2.style.display = 'none';
		// clearInterval(intrvl);
		cancelAnimationFrame(mmm);
	}


}

overlayCloseButton.addEventListener('click', handleClose);
tableCloseButton.addEventListener('click', handleClose);


tablePlayPauseButton.addEventListener('click', function(e){
	// console.log(e.target);
	if(this.getAttribute('aria-pressed') === 'false'){

		this.className = 'play_pause play';

		// this.firstElementChild.alt = 'play';
		this.setAttribute('aria-pressed', true);
		pauseExplain.textContent = 'pause/play toggle button. this table has an animation as its background. pause it for better performance. currently paused.';
		dy = 0;
		// clearInterval(intrvl);
		cancelAnimationFrame(mmm);

	} else {
		this.className = 'play_pause pause';
		// this.firstElementChild.alt = 'pause';
		this.setAttribute('aria-pressed', false);
		pauseExplain.textContent = 'pause/play toggle button. this table has an animation as its background. pause it for better performance. currently playing.';
		dy = speed;
		// intrvl = setInterval(draw, speed);


		tableSource = Object.keys(sources)[Math.floor(Math.random() * Object.keys(sources).length)];


		if(!sources[tableSource]){
			let newImg = new Image();

			newImg.onload = function(){
				imgW = this.width;
				imgH = this.height;
				tableImageY = imgH - CanvasYSize;
			}

			newImg.src = `images/${tableSource}.jpg`;
			sources[tableSource] = newImg;
			tableImg = sources[tableSource];

		} else {
			tableImg = sources[tableSource];
			imgW = tableImg.width;
			imgH = tableImg.height;
			tableImageY = imgH - CanvasYSize;
		}

		mmm = requestAnimationFrame(panorama);

	}

});


overlayNextButton.addEventListener('click', function(){
	if(switchFlag){
		rotations.unshift(rotations.pop());
		for(let i = 0; i < options.length; i++){
			options[i].dataset.pos = rotations[i];
		}
		depths.unshift(depths.pop());
		handleLinearTransInit();
	} else {
		flipCards(nextAnims);
		rotations.unshift(rotations.pop());
		for(let i = 0; i < options.length; i++){
			options[i].dataset.pos = rotations[i];
		}
		handleCurvedTransNextPrev();
	}
});
overlayPrevButton.addEventListener('click', function(){
	if(switchFlag){
		rotations = rotations.slice(1).concat(rotations[0]);
		for(let i = 0; i < options.length; i++){
			options[i].dataset.pos = rotations[i];
		}
		depths = depths.slice(1).concat(depths[0]);
		handleLinearTransInit();
	} else {
		flipCards(prevAnims);
		rotations = rotations.slice(1).concat(rotations[0]);
		for(let i = 0; i < options.length; i++){
			options[i].dataset.pos = rotations[i];
		}
		handleCurvedTransNextPrev();
	}
});
for(let q = 0; q < 15; q++){
	for(let z = 0; z < 15; z++){
		boxes.push([q * 20, z * 20]);
	}
}
function randomizeBoxes(){
	let randos = getRands(boxes.length);
	let randArray = [];
	randos.forEach((x,i) => {
		randArray[x] = boxes[i];
	});
	return randArray;
}
let randBoxes = randomizeBoxes();
function animate2(){
    if(t2 < randBoxes.length - 1){ requestAnimationFrame(animate2); }
	ctx.clearRect(randBoxes[t2][0], randBoxes[t2][1], 20, 20);
    t2++;
	if(t2 === randBoxes.length){
		linksDiv.style.zIndex = 5;
		// linksDivLinks[0].tabIndex = "1";
		// linksDivLinks[1].tabIndex = "1";

		linksDivLinks.forEach(s => {
			s.tabIndex = "1";
			s.removeAttribute('aria-hidden');
		});


		linksDivLinks[0].focus();
	}
}
for(let i = 100; i >= 0; i--){
	shades.push(i/100);
}
function animate(){
    if(t < shades.length){ requestAnimationFrame(animate); }
	ctxFader.fillStyle = `rgba(173, 216, 230, ${shades[t]})`;
	ctxFader.clearRect(0, 0, 75, 75);
	ctxFader.fillRect(0, 0, 75, 75);
    t++;
	if(t === shades.length){
		faderCanv.style.display = 'none';
		canvas.style.backgroundColor = 'transparent';
		window.setTimeout(animate2, 2000);
	}
}
for(let i = 0; i < 4; i++){
	for(let j = 0; j < 4; j++){
		canvArray.push([j * 75, i * 75]);
	}
}
function getRands(amt){
	let nums = new Set();
	while(nums.size < amt){
		let n = Math.floor(Math.random() * amt);
		nums.add(n);
	}
	return [...nums];
}
// image0.src = 'images/loading.png';
// image1.src = 'images/loading.png';
// image2.src = 'images/loading.png';
// image3.src = 'images/loading.png';
// image4.src = 'images/loading.png';
// image5.src = 'images/loading.png';
// image6.src = 'images/loading.png';
// image7.src = 'images/loading.png';
// image8.src = 'images/loading.png';
// image9.src = 'images/loading.png';
// image10.src = 'images/loading.png';
// image11.src = 'images/loading.png';
// image12.src = 'images/loading.png';
// image13.src = 'images/loading.png';
// image14.src = 'images/loading.png';
// image15.src = 'images/loading.png';
// contact.src = 'images/loading.png';
function checkBoard(){
	let randos = getRands(canvArray.length - 1);
	let solArray = [];
	randos.forEach((x,i) => {
		solArray[x] = i;
	});
	return [solArray.concat([15]), randos.concat([15])];
}
function getInversions(arr){
	let inversions = 0;
	for(let i = 0; i < arr.length; i++){
		if(arr[i] == null){continue;}
		for(let j = 0; j < arr.length; j++){
			if(arr[i] > arr[j + i]){
				inversions++;
			}
		}
	}
	return inversions;
}
let doable = checkBoard();
while(getInversions(doable[0]) % 2 !== 0){
	doable = checkBoard();
}
// canvArray[doable[1][0]].unshift(image0);
// canvArray[doable[1][1]].unshift(image1);
// canvArray[doable[1][2]].unshift(image2);
// canvArray[doable[1][3]].unshift(image3);
// canvArray[doable[1][4]].unshift(image4);
// canvArray[doable[1][5]].unshift(image5);
// canvArray[doable[1][6]].unshift(image6);
// canvArray[doable[1][7]].unshift(image7);
// canvArray[doable[1][8]].unshift(image8);
// canvArray[doable[1][9]].unshift(image9);
// canvArray[doable[1][10]].unshift(image10);
// canvArray[doable[1][11]].unshift(image11);
// canvArray[doable[1][12]].unshift(image12);
// canvArray[doable[1][13]].unshift(image13);
// canvArray[doable[1][14]].unshift(image14);
// canvArray[15].unshift('blank');
// let boardArray = doable[1].slice();
let boardOrder = doable[0].slice();
// let orderedArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
overlayContactButton.addEventListener('click', function(e){




	canvasholder.style.display = 'flex';
	[...overlayButtons, menuHold, subhead[0], subhead[1], desc[0], desc[1]].forEach(f => f.style.opacity = '0');

	[...overlayButtons].forEach(g => g.setAttribute('aria-hidden', true));
	// menuHold.style.opacity = '0';
	// subhead[0].style.opacity = '0';
	// desc[0].style.opacity = '0';
	// subhead[1].style.opacity = '0';
	// desc[1].style.opacity = '0';
	// overlayNextButton.style.opacity = "0";
	// overlayPrevButton.style.opacity = "0";
	// overlayCloseButton.style.opacity = "0";
	// overlayContactButton.style.opacity = "0";
	[...overlayButtons, seconds].forEach(z => z.tabIndex = "-1");
	// overlayNextButton.tabIndex = "-1";
	// overlayPrevButton.tabIndex = "-1";
	// overlayCloseButton.tabIndex = "-1";
	// overlayContactButton.tabIndex = "-1";
	// seconds.tabIndex = "-1";

	for(let i = 0; i < options.length; i++){
		options[i].tabIndex = "-1";
		let thisInput = options[i].querySelectorAll('input');

		if(thisInput[1]){
			thisInput[1].tabIndex = "-1";
		}
		thisInput[0].tabIndex = "-1";
	}
	if(canvArray.length == 0){
		// linksDivLinks[0].tabIndex = "1";
		// linksDivLinks[1].tabIndex = "1";

		linksDivLinks.forEach(s => {
			s.tabIndex = "1";
			s.removeAttribute('aria-hidden');
		});

		linksDivLinks[0].focus();
	} else {
		canvasbuttons[1].focus();
	}
	// for(let i = 0; i < canvArray.length; i++){
	// 	if(canvArray[i][0] != 'blank'){
	// 		ctx.drawImage(canvArray[i][0], canvArray[i][1], canvArray[i][3], 75, 75);
	// 	} else {}
	// }

// console.log(doable[1]);
if(clicks < 1){
	for(let i = 0; i < canvArray.length-1; i++){
		// if(canvArray[i][0] != 'blank'){
			ctx.drawImage(contact, canvArray[i][0], canvArray[i][1], 75, 75,
				canvArray[doable[1][i]][0], canvArray[doable[1][i]][1], 75, 75);
		// } else {}
		// console.log(canvArray[doable[1][i]]);
	}
}
	console.log(canvArray);
	// console.log(boardArray);
	console.log(boardOrder);



});
function swapTiles(x, y){
	if(canvArray.length === 0){return;}
	// let tileClicked = `${Math.floor(y / 75)}${Math.floor(x / 75)}`;

	let tileClicked = (Math.floor(y / 75) * 4) + Math.floor(x / 75);
	// console.log(tileClicked);
	let blank;
	let blankIndex;
	let swapTile;
	let swapTileIndex;
	let temp;
	let thisClose = 0;
	let finalCheck;
	// for(let i = 0; i < canvArray.length; i++){
		// if(canvArray[i][0] !== 'blank'){
		// 	if(canvArray[i][5] !== canvArray[i][0].src.match(/\d{2}(?=\.jpg)/)[0]){
		// 		thisClose++;
		// 	}
		// } else {
		// 	if(canvArray[i][5] !== '33'){
		// 		thisClose++;
		// 	}
		// }

		// if(canvArray[i][0] === 'blank'){
		// 	if(![1, 10].includes(Math.abs(parseInt(canvArray[i][5], 10) - parseInt(tileClicked, 10)))){
		// 		return;
		// 	}
		// 	blank = canvArray[i];
		// 	blankIndex = i;
		// }

		// if(tileClicked === canvArray[i][5]){
		// 	swapTile = canvArray[i];
		// 	swapTileIndex = i;
		// }

// ----------------------
		// if(canvArray[i][0] !== 'blank'){
		// 	if(boardArray[i] !== i){
		// 		thisClose++;
		// 	}
    //
		// 	if(tileClicked === canvArray[i][4]){
		// 		swapTile = canvArray[i];
		// 		swapTileIndex = i;
		// 	}
    //
		// } else {
		// 	if(canvArray[i][5] !== '33'){
		// 		thisClose++;
		// 	}
    //
		// 	if(![1, 10].includes(Math.abs(parseInt(canvArray[i][5], 10) - parseInt(tileClicked, 10)))){
		// 		return;
		// 	}
		// 	blank = canvArray[i];
		// 	blankIndex = i;
    //
		// }


		// if(canvArray[i][0] === 'blank'){
    //
		// }

	// }

	let blank2 = boardOrder.indexOf(15);
	let rrr = boardOrder[tileClicked];

	// if(rrr === 15){
	// 	return;
	// }
	if(![1, 4].includes(Math.abs(tileClicked - blank2))){
		return;
	}



	// blank = boardArray.indexOf(15);


	ctx.clearRect(canvArray[tileClicked][0], canvArray[tileClicked][1], 75, 75);

	ctx.drawImage(contact, canvArray[rrr][0], canvArray[rrr][1], 75, 75,
	canvArray[blank2][0], canvArray[blank2][1], 75, 75);


	// [
	// 	boardArray[rrr], boardArray[blank]
	// ] = [
	// 	boardArray[blank], boardArray[rrr]
	// ];

	[
		boardOrder[tileClicked], boardOrder[blank2]
	] = [
		boardOrder[blank2], boardOrder[tileClicked]
	];

	// console.log(boardArray);
	console.log(boardOrder);
	// let bool = true;
	if(boardOrder[0] === 0 && boardOrder[3] === 3 && boardOrder[11] === 11 && boardOrder[14] === 14){
		console.log('searching...');
		finalCheck = true;
		// console.log(boardOrder.every(x => boardOrder[x] === x));

		for(let f = 0; f < boardOrder.length; f++){
			if(boardOrder[f] !== f){
				finalCheck = false;
				break;
			}

		}
		console.log(finalCheck);
	}





	// ctx.drawImage(swapTile[0], blank[1], blank[3], 75, 75);
	// ctx.clearRect(swapTile[1], swapTile[3], 75, 75);
	// temp = swapTile[0];
	// canvArray[swapTileIndex][0] = 'blank';
	// canvArray[blankIndex][0] = temp;
	// if(thisClose < 3){
	// 	for(let i = 0; i < canvArray.length; i++){
	// 		if(canvArray[i][0] !== 'blank'){
	// 			if(canvArray[i][5] !== canvArray[i][0].src.match(/\d{2}(?=\.jpg)/)[0]){
	// 				finalCheck = false;
	// 				break;
	// 			}
	// 		} else {
	// 			if(canvArray[i][5] !== '33'){
	// 				finalCheck = false;
	// 				break;
	// 			}
	// 		}
	// 	}
	// } else {
	// 	finalCheck = false;
	// }
	if(finalCheck){
		faderCanv.style.display = 'block';
		canvasbuttons[1].style.display = 'none';
		animate();
		ctx.drawImage(contact, 225, 225, 75, 75,
		225, 225, 75, 75);
		canvArray = [];
	}
}
canvas.addEventListener('click', function(e){
	let x = e.offsetX;
	let y = e.offsetY;
	swapTiles(x,y);
	clicks++;
	if(clicks === 1){
		helpText.style.display = 'none';
	}
	clickCounter.textContent = clicks;
});
canvasbuttons[0].addEventListener('click', e => { //contact info close button
	canvasholder.style.display = 'none';
	// overlay.style.filter = 'none';
	// menuIcon.style.display = 'flex';
	// projectNotesIcon.style.display = 'flex';
	menuIcon.style.zIndex = '5';
	// main.style.display = 'block';
	menuHold.style.opacity = '1';

	[subhead[0], subhead[1], desc[0], desc[1]].forEach(q => q.style.opacity = '.35');
	[...overlayButtons].forEach(o => {
		o.style.opacity = "1";
		o.tabIndex = "1";
	});

	// subhead[0].style.opacity = '.35';
	// desc[0].style.opacity = '.35';
	// subhead[1].style.opacity = '.35';
	// desc[1].style.opacity = '.35';
	// overlayNextButton.style.opacity = "1";
	// overlayPrevButton.style.opacity = "1";
	overlayCloseButton.removeAttribute('aria-hidden');
	overlayContactButton.removeAttribute('aria-hidden');
	// overlayNextButton.tabIndex = "1";
	// overlayPrevButton.tabIndex = "1";
	// overlayCloseButton.tabIndex = "1";
	// overlayContactButton.tabIndex = "1";
	// linksDivLinks[0].tabIndex = "-1";
	// linksDivLinks[1].tabIndex = "-1";

	linksDivLinks.forEach(s => {
		s.tabIndex = "-1";
		s.setAttribute('aria-hidden', true);
	});



	seconds.tabIndex = seconds.hasAttribute('disabled') ? "-1" : "1";
	for(let i = 0; i < options.length; i++){
		if(options[i].dataset.pos === '0'){
			tabIndMgrCurrentItem(i);
		}
	}
	overlayCloseButton.focus();
});
canvasbuttons[1].addEventListener('click', e => {
	helpText.style.display = 'none';
	ctx.clearRect(0, 0, 300, 300);
	ctx.drawImage(contact, 0, 0, 300, 300);
	canvArray = [];
	canvas.style.backgroundColor = 'transparent';
	window.setTimeout(animate2, 2000);
	canvasbuttons[1].style.display = 'none';
});
function rotate(e){
	if(!isRotating) return;
	const xPos = (e.x || Math.floor(e.touches[0].clientX)) + window.scrollX;
	const yPos = (e.y || Math.floor(e.touches[0].clientY)) - 0 + window.scrollY;
	rotObj[whichPB].xs = xPos - xStart + rotObj[whichPB].x;
	rotObj[whichPB].ys = yPos - yStart + rotObj[whichPB].y;
	pb[whichPB].style.transform = `rotateX(${-rotObj[whichPB].ys}deg) rotateY(${rotObj[whichPB].xs}deg)`;
};
function getCube(e){

	const cubeZeroCtr = { x : (cc[0].offsetLeft + cc[0].offsetWidth/2),
				  y : (cc[0].offsetTop - 0 + cc[0].offsetHeight/2)
				}
	const cubeOneCtr = { x : (cc[1].offsetLeft + cc[1].offsetWidth/2),
				  y : (cc[1].offsetTop - 0 + cc[1].offsetHeight/2)
				}
	xStart = (e.x || Math.floor(e.touches[0].clientX)) + window.scrollX;
	yStart = (e.y || Math.floor(e.touches[0].clientY)) - 0 + window.scrollY;
	const distFromCubeZero = Math.round(Math.sqrt(Math.pow(Math.abs(cubeZeroCtr.x - xStart),2) + Math.pow(Math.abs(cubeZeroCtr.y - yStart),2)));
	const distFromCubeOne = Math.round(Math.sqrt(Math.pow(Math.abs(cubeOneCtr.x - xStart),2) + Math.pow(Math.abs(cubeOneCtr.y - yStart),2)));
	if(distFromCubeZero <= distFromCubeOne){
		whichPB = 0;
		// classToAdd = 'first';
	} else {
		whichPB = 1;
		// classToAdd = 'second';
	}

	// pb[whichPB].children[3].classList.add(classToAdd);
	isRotating = true;
};
main.addEventListener('mousedown', getCube);
main.addEventListener('touchstart', getCube, {passive: true});
main.addEventListener('mousemove', rotate);
main.addEventListener('touchmove', rotate, {passive: true});
document.addEventListener('touchmove', e => {
	if(e.target.tagName === 'A'){
		e.preventDefault();
	}
}, {passive: false});
function releaseCube(e){
	isRotating = false;
	if(e.type[0] === 'm'){
		xEnd = e.x + window.scrollX;
		yEnd = e.y - 0 + window.scrollY;
	}
	rotObj[whichPB].x = rotObj[whichPB].xs || 0;
	rotObj[whichPB].y = rotObj[whichPB].ys || 0;
};
main.addEventListener('mouseup', releaseCube);
main.addEventListener('touchend', releaseCube);
main.addEventListener('mouseleave', (e) => {
	isRotating = false;
	xEnd = e.x + window.scrollX;
	yEnd = e.y - 0 + window.scrollY;
	rotObj[whichPB].x = rotObj[whichPB].xs || 0;
	rotObj[whichPB].y = rotObj[whichPB].ys || 0;
});
