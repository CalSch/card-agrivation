//#region holes

let boardEl=document.getElementById('board');
let holesEl=document.getElementById('holes');

let holeSize=10;
let holeSpace=5.8;
let A=41.6666667;
let B=(500-((holeSpace+holeSize)*13))/2;

/**@type {HTMLDivElement[]}*/
let holes=[];

let testHole=get_hole(0,0);
function reloadHoles() {
	let size=getComputedStyle(document.documentElement).getPropertyValue('--hole-size');
	size.replace('px','');
	holeSize=parseFloat(size);

	let space=getComputedStyle(document.documentElement).getPropertyValue('--hole-space');
	space.replace('px','');
	holeSpace=parseFloat(space);

	B=(500-((holeSpace+holeSize)*13))/2;

	gen_holes();
	holes=holes.sort(function(a, b){return parseInt(a.getAttribute('hid')) - parseInt(b.getAttribute('hid'))});
}
// setInterval(reloadHoles,1000);
reloadHoles();

function make_hole(x,y,id=0) {
	let el=document.createElement('div');
	el.classList.add('hole');
	el.style.left=`${x}px`;
	el.style.top=`${y}px`;
	// el.style.backgroundColor=`hsl(0,0%,${id%6==0?100:0}%)`
	el.setAttribute('title',id);
	el.setAttribute('hid',id);
	holesEl.appendChild(el);
	holes.push(el);
}
function get_hole(x,y) {
	let el=document.createElement('div');
	el.classList.add('hole');
	el.style.left=`${x}px`;
	el.style.top=`${y}px`;
	return el;
}

function gen_holes() {
	while(holesEl.hasChildNodes()) {
		holesEl.removeChild(holesEl.childNodes[0]);
	}
	holes=[];

	let cid=0;

	for (let i=0;i<13;i++) {
		make_hole(B+i*(holeSize+holeSpace),A,cid);              //top
		cid++;
	}
	for (let i=1;i<7;i++) {
		make_hole(B+12*(holeSize+holeSpace),A+(i)*(holeSize+holeSpace),cid); //top right 1
		cid++;
	}
	cid+=4;
	for (let i=1;i<6;i++) {
		make_hole(500-A-(i+1)*(holeSize+holeSpace),B,cid); //top right 2
		cid--;
	}
	cid+=6;

	for (let i=0;i<13;i++) {
		make_hole(500-A-holeSize-holeSpace,B+i*(holeSize+holeSpace),cid); //right
		cid++;
	}
	for (let i=1;i<6;i++) {
		make_hole(500-A-(i+1)*(holeSize+holeSpace),500-B-holeSize-holeSpace,cid); //bottom right 2
		cid++;
	}
	cid+=5;
	for (let i=1;i<7;i++) {
		make_hole(B+12*(holeSize+holeSpace),500-A-(i)*(holeSize+holeSpace)-holeSize-holeSpace,cid); //bottom right 1
		cid--;
	}
	cid+=7;

	cid+=12;
	for (let i=0;i<13;i++) {
		make_hole(B+i*(holeSize+holeSpace),500-A-holeSize-holeSpace,cid); //bottom
		cid--;
	}
	cid+=14;
	for (let i=1;i<7;i++) {
		make_hole(B,500-A-(i)*(holeSize+holeSpace)-holeSize-holeSpace,cid); //bottom left 1
		cid++;
	}
	cid+=4;
	for (let i=1;i<6;i++) {
		make_hole(A+i*(holeSize+holeSpace),500-B-holeSize-holeSpace,cid); //bottom left 2
		cid--;
	}

	cid+=18;
	for (let i=0;i<13;i++) {
		make_hole(A,B+i*(holeSize+holeSpace),cid); //left
		cid--;
	}
	cid+=14;
	for (let i=1;i<6;i++) {
		make_hole(A+i*(holeSize+holeSpace),B,cid); //top left 2
		cid++;
	}
	cid+=5;
	for (let i=1;i<7;i++) {
		make_hole(B,A+(i)*(holeSize+holeSpace),cid); //top left 1
		cid--;
	}
}
//#endregion

//#region pegs

let colors=['yellow','red','blue','grey'];

class Peg {
	/**
	 * @param {number} pos 
	 * @param {number} color 
	 * @param {boolean} isBlocker 
	 * @param {boolean} poisoned 
	 */
	constructor(pos,color,isBlocker=false,poisoned=false) {
		this.pos=pos;
		this.color=color;
		this.isBlocker=isBlocker;
		this.poisoned=poisoned;
	}
	move(spaces) {
		this.pos+=spaces;
	}

}

function renderPeg(peg) {
	// holes[peg.pos].classList.remove(colors);
	// holes[peg.pos].classList.add(colors[peg.color]);
	// holes[peg.pos].classList.replace(/(yellow|red|blue|grey)/g,colors[peg.color]);
	holes[peg.pos].style.setProperty('--peg-color',colors[peg.color]);
	
}

let peg=new Peg(0,0);
renderPeg(peg);
renderPeg(new Peg(1,1));
renderPeg(new Peg(2,2));
renderPeg(new Peg(3,3));

//#endregion