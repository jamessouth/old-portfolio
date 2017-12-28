const pb = document.querySelectorAll('.photo-cube');
const cc = document.querySelectorAll('.cube-container');
const body = document.querySelector('body');
const menuIcon = document.querySelector('.hamburger');
const canvas = document.querySelector('canvas#board');
const canvasholder = document.querySelector('.canvasholder');
const sizeInput = document.querySelector('.menu-hold .slider input');
const sizeInputP = document.querySelector('.menu-hold .slider p');
const sizeTrack = document.querySelector('.menu-hold .slider .track');
const overlay = document.querySelector('div.overlay');
const overlayCloseButton = overlay.querySelector('button.close');
const overlayNextButton = overlay.querySelector('button.next');
const overlayPrevButton = overlay.querySelector('button.prev');
const overlayContactButton = overlay.querySelector('button.contact');
const menuHolder = document.querySelector('.menu-hold ul');
const options = document.querySelectorAll('.menu-hold ul li');
const menuHold = document.querySelector('.menu-hold');
const buttons = document.querySelector('button');
const hold = document.querySelector('div.hold');
const flipSwitch = document.querySelector('.menu-hold div.flip-switch');
const radioLinear = flipSwitch.querySelector('input[id="linear"]');
const radioCurved = flipSwitch.querySelector('input[id="curved"]');
const switchHolder = flipSwitch.querySelector('div.rect-prism-container');
const theSwitch = flipSwitch.querySelector('div.switch-rect');
const switchBottom = theSwitch.querySelector('div.switch-bottom');
const switchLeft = theSwitch.querySelector('div.switch-left');
const check = document.querySelectorAll('.menu-hold input.check');
const checkLabel = document.querySelectorAll('.menu-hold input.check + label');
const subhead = document.querySelectorAll('.subhead:nth-of-type(odd)');
const desc = document.querySelectorAll('.subhead:nth-of-type(even)');
const liOverlay = menuHolder.querySelectorAll('.li-overlay');
const cubeLinks = document.querySelectorAll('div.cube-container div.photo-cube div a');
let destroyFlag = false;
const explode = document.querySelectorAll('.explode');
const headline = document.querySelector('.hold h1');
const seconds = document.querySelector('.menu-hold select');
const secondsLabel = document.querySelector('.menu-hold label[for="sec"]');
const secondsP = document.querySelector('.menu-hold ul li p.seconds');
const canvasbuttons = document.querySelectorAll('.canvasbuttons button');
const faderCanv = document.querySelector('.canvasbuttons #fader');
const linksDiv = document.querySelector('.canvasbuttons #contactinfolinks');
const linksDivLinks = document.querySelectorAll('.canvasbuttons #contactinfolinks a');
const clickCounter = document.querySelector('.canvasbuttons .clickCounter p:last-of-type');
const helpText = document.querySelector('.canvasbuttons .help');
const proj3 = document.querySelector('.first:nth-of-type(3)');
const proj4 = document.querySelector('.first:nth-of-type(4)');
const proj7 = document.querySelector('.second:nth-of-type(1)');
const proj9 = document.querySelector('.second:nth-of-type(3)');
const proj10 = document.querySelector('.second:nth-of-type(4)');
const proj11 = document.querySelector('.second:nth-of-type(5)');
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
let shades = [];
let canvArray = [];
let image0 = new Image();
let image1 = new Image();
let image2 = new Image();
let image3 = new Image();
let image4 = new Image();
let image5 = new Image();
let image6 = new Image();
let image7 = new Image();
let image8 = new Image();
let image9 = new Image();
let image10 = new Image();
let image11 = new Image();
let image12 = new Image();
let image13 = new Image();
let image14 = new Image();
let image15 = new Image();
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
seconds.value = 0;
sizeInput.value = 220;
radioLinear.checked = true;
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
		proj3.style.backgroundImage = 'url("images/p3.gif")';
		proj4.style.backgroundImage = 'url("images/p4.gif")';
		proj7.style.backgroundImage = 'url("images/p7.gif")';
		proj9.style.backgroundImage = 'url("images/p9.gif")';
		proj10.style.backgroundImage = 'url("images/p10.gif")';
		proj11.style.backgroundImage = 'url("images/p11.gif")';
	} else {
		checkLabel[0].textContent = 'no GIFs';
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
		checkLabel[1].textContent = 'DESTROY!';
		destroyFlag = true;
		seconds.style.filter = 'blur(0px)';
		secondsLabel.style.filter = 'blur(0px)';
		secondsP.style.filter = 'blur(0px)';
		seconds.removeAttribute('disabled');
		seconds.tabIndex = "1";
	} else {
		checkLabel[1].textContent = 'do not destroy';
		destroyFlag = false;
		seconds.style.filter = 'blur(30px)';
		secondsLabel.style.filter = 'blur(30px)';
		secondsP.style.filter = 'blur(30px)';
		seconds.setAttribute('disabled', '');
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
		} else if(e.key.toLowerCase() === 'enter' || e.keyCode === 13 || e.key.toLowerCase() === ' ' || e.keyCode === 32){
		} else {
			e.preventDefault();
			return;
		}
	}
	cubeLinks.forEach(x => x.tabIndex = "-1");
	this.tabIndex = "-1";
	this.blur();
	this.children[0].classList.add('top-bun');
	this.children[2].classList.add('bottom-bun');
	overlay.style.display = 'flex';
	hold.style.opacity = '0.35';
	this.style.opacity = '0.35';
	for(let i = 0; i < subhead.length; i++){
		subhead[i].style.opacity = '0.35';
		desc[i].style.opacity = '0.35';
	}
 if(switchFlag){
	 handleLinearTransInit();
 } else {
	 handleCurvedTransInit();
 }
}
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
['click', 'keydown'].forEach(evt => {
	menuIcon.addEventListener(evt, handleMenu);
});
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
	cube.classList.add('blowup');
	window.setTimeout(() => {
		explode[0].style.display = 'none';
		explode[1].style.display = 'none';
	}, (seconds.value * 1000) + 5490);
}
overlayCloseButton.addEventListener('click', function(){
	overlay.style.display = 'none';
	menuIcon.children[0].classList.remove('top-bun');
	menuIcon.children[2].classList.remove('bottom-bun');
	menuIcon.style.opacity = '1';
	cubeLinks.forEach(x => x.tabIndex = "0");
	menuIcon.tabIndex = "0";
	hold.style.opacity = '1';
	for(let i = 0; i < subhead.length; i++){
		subhead[i].style.opacity = '1';
		desc[i].style.opacity = '1';
	}
	for(let i = 0; i < options.length; i++){
		options[i].className = '';
		options[i].style.transform = '';
	}
	if(destroyFlag){
		destroyCube(pb[0]);
		destroyCube(pb[1]);
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
		linksDivLinks[0].tabIndex = "1";
		linksDivLinks[1].tabIndex = "1";
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
		canvArray.push([j * 75, (j * 75) + 75, i * 75, (i * 75) + 75, `${i}${j}`]);
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
image0.src = 'images/00.jpg';
image1.src = 'images/01.jpg';
image2.src = 'images/02.jpg';
image3.src = 'images/03.jpg';
image4.src = 'images/10.jpg';
image5.src = 'images/11.jpg';
image6.src = 'images/12.jpg';
image7.src = 'images/13.jpg';
image8.src = 'images/20.jpg';
image9.src = 'images/21.jpg';
image10.src = 'images/22.jpg';
image11.src = 'images/23.jpg';
image12.src = 'images/30.jpg';
image13.src = 'images/31.jpg';
image14.src = 'images/32.jpg';
image15.src = 'images/33.jpg';
contact.src = 'images/contact.jpg';
function checkBoard(){
	let randos = getRands(canvArray.length - 1);
	let solArray = [];
	randos.forEach((x,i) => {
		solArray[x] = i;
	});
	return [solArray, randos];
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
canvArray[doable[1][0]].unshift(image0);
canvArray[doable[1][1]].unshift(image1);
canvArray[doable[1][2]].unshift(image2);
canvArray[doable[1][3]].unshift(image3);
canvArray[doable[1][4]].unshift(image4);
canvArray[doable[1][5]].unshift(image5);
canvArray[doable[1][6]].unshift(image6);
canvArray[doable[1][7]].unshift(image7);
canvArray[doable[1][8]].unshift(image8);
canvArray[doable[1][9]].unshift(image9);
canvArray[doable[1][10]].unshift(image10);
canvArray[doable[1][11]].unshift(image11);
canvArray[doable[1][12]].unshift(image12);
canvArray[doable[1][13]].unshift(image13);
canvArray[doable[1][14]].unshift(image14);
canvArray[15].unshift('blank');
overlayContactButton.addEventListener('click', function(e){
	canvasholder.style.display = 'flex';
	overlay.style.filter = 'blur(30px)';
	menuIcon.style.filter = 'blur(20px)';
	hold.style.filter = 'blur(30px)';
	subhead[0].style.filter = 'blur(10px)';
	desc[0].style.filter = 'blur(10px)';
	subhead[1].style.filter = 'blur(10px)';
	desc[1].style.filter = 'blur(10px)';
	overlayNextButton.tabIndex = "-1";
	overlayPrevButton.tabIndex = "-1";
	overlayCloseButton.tabIndex = "-1";
	overlayContactButton.tabIndex = "-1";
	for(let i = 0; i < options.length; i++){
		options[i].tabIndex = "-1";
		let thisInput = options[i].querySelectorAll('input');
		if(thisInput[1]){
			thisInput[1].tabIndex = "-1";
		}
		thisInput[0].tabIndex = "-1";
	}
	if(canvArray.length == 0){
		linksDivLinks[0].tabIndex = "1";
		linksDivLinks[1].tabIndex = "1";
	}
	for(let i = 0; i < canvArray.length - 1; i++){
		ctx.drawImage(canvArray[i][0], canvArray[i][1], canvArray[i][3], 75, 75);
	}
});
function swapTiles(x, y){
	if(canvArray.length === 0){return;}
	let tileClicked = `${Math.floor(y / 75)}${Math.floor(x / 75)}`;
	let blank;
	let blankIndex;
	let swapTile;
	let swapTileIndex;
	let temp;
	let thisClose = 0;
	let finalCheck = true;
	for(let i = 0; i < canvArray.length; i++){
		if(canvArray[i][0] !== 'blank'){
			if(canvArray[i][5] !== canvArray[i][0].src.match(/\d{2}(?=\.jpg)/)[0]){
				thisClose++;
			}
		} else {
			if(canvArray[i][5] !== '33'){
				thisClose++;
			}
		}
		if(canvArray[i][0] === 'blank'){
			if(![1, 10].includes(Math.abs(parseInt(canvArray[i][5], 10) - parseInt(tileClicked, 10)))){
				return;
			}
			blank = canvArray[i];
			blankIndex = i;
		}
		if(tileClicked === canvArray[i][5]){
			swapTile = canvArray[i];
			swapTileIndex = i;
		}
	}
	ctx.drawImage(swapTile[0], blank[1], blank[3], 75, 75);
	ctx.clearRect(swapTile[1], swapTile[3], 75, 75);
	temp = swapTile[0];
	canvArray[swapTileIndex][0] = 'blank';
	canvArray[blankIndex][0] = temp;
	if(thisClose < 3){
		for(let i = 0; i < canvArray.length; i++){
			if(canvArray[i][0] !== 'blank'){
				if(canvArray[i][5] !== canvArray[i][0].src.match(/\d{2}(?=\.jpg)/)[0]){
					finalCheck = false;
					break;
				}
			} else {
				if(canvArray[i][5] !== '33'){
					finalCheck = false;
					break;
				}
			}
		}
	} else {
		finalCheck = false;
	}
	if(finalCheck){
		faderCanv.style.display = 'block';
		canvasbuttons[1].style.display = 'none';
		animate();
		ctx.drawImage(image15, 225, 225, 75, 75);
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
canvasbuttons[0].addEventListener('click', e => {
	canvasholder.style.display = 'none';
	overlay.style.filter = 'none';
	menuIcon.style.filter = 'none';
	menuIcon.style.zIndex = '5';
	hold.style.filter = 'none';
	subhead[0].style.filter = 'none';
	desc[0].style.filter = 'none';
	subhead[1].style.filter = 'none';
	desc[1].style.filter = 'none';
	overlayNextButton.tabIndex = "1";
	overlayPrevButton.tabIndex = "1";
	overlayCloseButton.tabIndex = "1";
	overlayContactButton.tabIndex = "1";
	linksDivLinks[0].tabIndex = "-1";
	linksDivLinks[1].tabIndex = "-1";
	for(let i = 0; i < options.length; i++){
		if(options[i].dataset.pos === '0'){
			tabIndMgrCurrentItem(i);
		}
	}
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
	} else {
		whichPB = 1;
	}
	isRotating = true;
};
hold.addEventListener('mousedown', getCube);
hold.addEventListener('touchstart', getCube, {passive: true});
hold.addEventListener('mousemove', rotate);
hold.addEventListener('touchmove', rotate, {passive: true});
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
hold.addEventListener('mouseup', releaseCube);
hold.addEventListener('touchend', releaseCube);
hold.addEventListener('mouseleave', (e) => {
	isRotating = false;
	xEnd = e.x + window.scrollX;
	yEnd = e.y - 0 + window.scrollY;
	rotObj[whichPB].x = rotObj[whichPB].xs || 0;
	rotObj[whichPB].y = rotObj[whichPB].ys || 0;
});