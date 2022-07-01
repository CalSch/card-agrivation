let boardEl=document.getElementById('board');
let holesEl=document.getElementById('holes');

let holeSize=10;
let holeSpace=5.8;
let A=41.6666667;
let B=(500-((holeSpace+holeSize)*13))/2;

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
}
// setInterval(reloadHoles,1000);
reloadHoles();

function make_hole(x,y) {
	let el=document.createElement('div');
	el.classList.add('hole');
	el.style.left=`${x}px`;
	el.style.top=`${y}px`;
	holesEl.appendChild(el);
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
	for (let i=0;i<13;i++) {
		make_hole(B+i*(holeSize+holeSpace),A);              //top
		make_hole(B+i*(holeSize+holeSpace),500-A-holeSize-holeSpace); //bottom
		make_hole(A             ,B+i*(holeSize+holeSpace)); //left
		make_hole(500-A-holeSize-holeSpace,B+i*(holeSize+holeSpace)); //right
	}
	
	for (let i=1;i<7;i++) {
		make_hole(B,A+(i)*(holeSize+holeSpace)); //top left
		make_hole(B+12*(holeSize+holeSpace),A+(i)*(holeSize+holeSpace)); //top right

		make_hole(B,500-A-(i)*(holeSize+holeSpace)-holeSize-holeSpace); //bottom left
		make_hole(B+12*(holeSize+holeSpace),500-A-(i)*(holeSize+holeSpace)-holeSize-holeSpace); //bottom right
	}

	for (let i=1;i<6;i++) {
		make_hole(A+i*(holeSize+holeSpace),        B);
		make_hole(500-A-(i+1)*(holeSize+holeSpace),B);
		make_hole(A+i*(holeSize+holeSpace),        500-B-holeSize-holeSpace);
		make_hole(500-A-(i+1)*(holeSize+holeSpace),500-B-holeSize-holeSpace);
	}
}
gen_holes();