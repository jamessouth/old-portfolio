
const pb = document.querySelectorAll('.photo-cube');
const cc = document.querySelectorAll('.cube-container');
// const body = document.querySelector('body');
// const main = document.querySelector('main');


// const cubes = Array.from(cc);

// const hold = document.querySelector('.hold');

// function rotateCube(e){
	// const pi = Math.PI;
	// const cx = this.offsetWidth/2;
	// const cy = this.offsetHeight/2;
	// const xPos = e.offsetX;
	// const yPos = e.offsetY;
	// const xs = xPos-cx;
	// const ys = yPos-cy;
	// const maxDist = Math.ceil(Math.sqrt(2) * cx);
	// const dist = Math.round(Math.sqrt(Math.pow(Math.abs(xs),2) +
				 // Math.pow(Math.abs(ys),2)));
	// const distDiff = maxDist - dist;
	// const speed = Math.round((-0.000045 * Math.pow((distDiff - 311), 2) + 5)*1000)/1000;
	// let dir = Math.atan(Math.abs(ys)/Math.abs(xs));
	// const rando = (Math.floor(Math.random()*180) + 1);


	// if(xs < 0 && ys >= 0){
		// dir = pi - dir;
	// } else if(xs < 0 && ys < 0){
		// dir += pi;
	// } else if(xs >= 0 && ys < 0){
		// dir = pi - dir + pi;
	// }

	// const xDeg = Math.round(Math.sin(dir));
	// const yDeg = Math.round(Math.cos(dir));

	// let gg = parseInt(this.dataset.x, 10);
	// let hh = parseInt(this.dataset.y, 10);

	// gg += rando*xDeg;
	// hh += rando*yDeg;

	// this.setAttribute('data-x', gg);
	// this.setAttribute('data-y', hh);

	// console.log(gg,hh);
	// // console.log(gg,hh, typeof hh);

	// console.log(this.dataset.x);
	// console.log(this.dataset.y);

	// // cos y
	// // sin x


	// this.style.transitionDuration = `${speed}s`;
	// this.style.transform = `rotateX(${gg}deg) rotateY(${hh}deg)`;


	// console.log(dir,xDeg, yDeg, rando);

// };

// pb.forEach(pb =>
	// pb.addEventListener('mousedown', rotateCube)
// );

//1em 2em 5em 4em


// let tt = document.querySelectorAll('img');

// tt.forEach(t =>
	// t.addEventListener('mousedown', (e) => {
		// // e.preventDefault();
		// return false;
	// }));

// main.addEventListener('mousedown', (e) => {e.preventDefault();});
// body.addEventListener('mousedown', (e) => {e.preventDefault();});


const menuIcon = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const sizeInput = document.querySelector('.menu-hold .slider input');
const sizeInputP = document.querySelector('.menu-hold .slider p');
const sizeTrack = document.querySelector('.menu-hold .slider .track');
const overlay = document.querySelector('div.overlay');
const overlayCloseButton = overlay.querySelector('button.close');
const overlayNextButton = overlay.querySelector('button.next');
const overlayPrevButton = overlay.querySelector('button.prev');
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




let switchFlag = true;
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
		switchFlag = true;
	}

	// console.log('linear:'+ radioLinear.checked, 'curved:'+ radioCurved.checked);


});



function handleUpdate() {
	const suffix = this.dataset.sizing;
	const width = this.max - this.min;
	const perc = Math.floor(((this.value - width) / width) * 100) / 100;

	// console.log();
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
	sizeInputP.textContent = this.value;
	sizeTrack.style.width = `${perc * 152}px`;
	sizeTrack.style.backgroundColor = `hsl(${perc * 720}, 65%, 30%)`;
	// this.parentNode.parentNode.style.filter = `hue-rotate(${perc * 360}deg)`;
}

sizeInput.addEventListener('change', handleUpdate);
sizeInput.addEventListener('mousemove', handleUpdate);


let depths = [0, -2000, -2500];
menuIcon.addEventListener('click', function(e){
	// console.log(this);

	this.children[0].classList.add('top-bun');
	this.children[2].classList.add('bottom-bun');
	// menu.style.display = 'block';
	//
	// window.setTimeout(() => {
	// 	menu.classList.add('expand');
	// }, 7);





	overlay.style.display = 'flex';
	hold.style.opacity = '0.35';
	// buttons.style.display = 'inline-block';
	// menuHold.style.display = 'block';



	for(let i = 0; i < options.length; i++){
		// console.log('ppp');
		options[i].style.transform = `rotateX(5deg) translateY(-200px) translateZ(${depths[i]}px)`;

		if(parseInt(options[i].style.transform.match(/(-?\d+)(?=px\)$)/)[0], 10) != 0){
			options[i].style.opacity = '0.3';
		}

	}

// console.log(depths);

});

overlayCloseButton.addEventListener('click', function(){
	overlay.style.display = 'none';
	menuIcon.children[0].classList.remove('top-bun');
	menuIcon.children[2].classList.remove('bottom-bun');
	// buttons.style.display = 'none';
	// menuHold.style.display = 'none';
	hold.style.opacity = '1';

});
// let degs = 5;
overlayNextButton.addEventListener('click', function(){
	// degs-=45;
	// console.log(degs);
	// menuHolder.style.transform = `rotateX(${degs}deg)`;
	// let place = parseInt(options[i].style.transform.match(/(-?\d+)(?=px\)$)/)[0], 10)
	depths.unshift(depths.pop());

	// console.log(depths);

	for(let i = 0; i < options.length; i++){
		// console.log('ppp');
		options[i].style.transform = `rotateX(5deg) translateY(-200px) translateZ(${depths[i]}px)`;

		if(parseInt(options[i].style.transform.match(/(-?\d+)(?=px\)$)/)[0], 10) != 0){
			options[i].style.opacity = '0.3';
		} else {
			options[i].style.opacity = '1';
		}
	}



});

overlayPrevButton.addEventListener('click', function(){
	// degs+=45;
	// console.log(degs);
	// menuHolder.style.transform = `rotateX(${degs}deg)`;

	depths = depths.slice(1).concat(depths[0]);

	// console.log(depths);

	for(let i = 0; i < options.length; i++){
		// console.log('ppp');
		options[i].style.transform = `rotateX(5deg) translateY(-200px) translateZ(${depths[i]}px)`;

		if(parseInt(options[i].style.transform.match(/(-?\d+)(?=px\)$)/)[0], 10) != 0){
			options[i].style.opacity = '0.3';
		} else {
			options[i].style.opacity = '1';
		}
	}

});







let isRotating = false;
let xStart;
let yStart;
let xEnd;
let yEnd;
// let xs;
// let ys;
// let oldXS;
// let oldYS;
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

function rotate(e){

	if(!isRotating) return;
	const xPos = e.x + window.scrollX;
	const yPos = e.y - 0 + window.scrollY;


	// if(xEnd){

		rotObj[whichPB].xs = xPos - xStart + rotObj[whichPB].x;
		rotObj[whichPB].ys = yPos - yStart + rotObj[whichPB].y;

	// } else {

		// rotObj[whichPB].xs = xPos - xStart;
		// rotObj[whichPB].ys = yPos - yStart;


	// }

	pb[whichPB].style.transform = `rotateX(${-rotObj[whichPB].ys}deg) rotateY(${rotObj[whichPB].xs}deg)`;

	// console.log(xPos, yPos, xStart, yStart, rotObj[whichPB].xs, rotObj[whichPB].ys, 'position, start, mvmt');
	// console.log(xs, ys);


};

hold.addEventListener('mousedown', (e) => {



		const cubeZeroCtr = { x : (cc[0].offsetLeft + cc[0].offsetWidth/2),
					  y : (cc[0].offsetTop - 0 + cc[0].offsetHeight/2)
					}

		const cubeOneCtr = { x : (cc[1].offsetLeft + cc[1].offsetWidth/2),
					  y : (cc[1].offsetTop - 0 + cc[1].offsetHeight/2)
					}

		// console.log(cubeZeroCtr.x, cubeZeroCtr.y, cubeOneCtr.x, cubeOneCtr.y, 'centers of pbs');

		xStart = e.x + window.scrollX;
		yStart = e.y - 0 + window.scrollY;


		const distFromCubeZero = Math.round(Math.sqrt(Math.pow(Math.abs(cubeZeroCtr.x - xStart),2) + Math.pow(Math.abs(cubeZeroCtr.y - yStart),2)));

		const distFromCubeOne = Math.round(Math.sqrt(Math.pow(Math.abs(cubeOneCtr.x - xStart),2) + Math.pow(Math.abs(cubeOneCtr.y - yStart),2)));

		// console.log(distFromCubeZero, distFromCubeOne, 'dists from pbs');

		if(distFromCubeZero <= distFromCubeOne){
			whichPB = 0;
		} else {
			whichPB = 1;
		}





		isRotating = true;
		// console.log(xStart, yStart, whichPB, 'start, which pb');
	});


hold.addEventListener('mousemove', rotate);

hold.addEventListener('mouseup', (e) => {


	isRotating = false;
	xEnd = e.x + window.scrollX;
	yEnd = e.y - 0 + window.scrollY;
	rotObj[whichPB].x = rotObj[whichPB].xs || 0;
	rotObj[whichPB].y = rotObj[whichPB].ys || 0;

	// oldXS = xs || 0;
	// oldYS = ys || 0;
	// console.log(xEnd, yEnd, rotObj[whichPB].x, rotObj[whichPB].y, 'end, rotation values');
	// console.log('\n\n');
});


hold.addEventListener('mouseleave', (e) => {

	isRotating = false;
	xEnd = e.x + window.scrollX;
	yEnd = e.y - 0 + window.scrollY;
	rotObj[whichPB].x = rotObj[whichPB].xs || 0;
	rotObj[whichPB].y = rotObj[whichPB].ys || 0;

	// oldXS = xs || 0;
	// oldYS = ys || 0;
	// console.log(xEnd, yEnd, rotObj[whichPB].x, rotObj[whichPB].y, 'end, rotation values');
	// console.log('\n\n');
	// console.log('mouse left');







});



// for(let i = 0; i < cc.length; i++){



	// cc[i].addEventListener('mousemove', rotate);

	// cc[i].addEventListener('mouseup', () => isRotating = false);
	// cc[i].addEventListener('mouseout', () => isRotating = false);

// }


	// [lastX, lastY] = [e.offsetX, e.offsetY];
