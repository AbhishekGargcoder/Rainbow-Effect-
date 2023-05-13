const canvas = document.getElementById("canvas1");
console.log(canvas);
const ctx = canvas.getContext('2d');
console.log(ctx);
addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(getComputedStyle(canvas).getPropertyValue("height"));
console.log(getComputedStyle(canvas).getPropertyValue("width"));
let mouse = {
    x: 100,
    y: 100
};
let hue = 0;
canvas.addEventListener('click', (e) => {       // for click event listener on canvas
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i = 0;i<10;i++){
        particleArray.push(new particle());
    }
    console.log(particleArray);
})
canvas.addEventListener('mousemove', (e) => {        // for mouseclick listener on canvas
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i = 0;i<10;i++){
        particleArray.push(new particle());
    }
})
const drawCircle = () => {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
    ctx.fill();
}
class particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 12 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue},100%,50%)`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;       // decrease size for every frame of aniamtion
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);  // all are random values for all circle particles
        ctx.fill();
    }
};
const particleArray = [];
function handleParticles() {    // traverse through each cicle and draw it on the canvas
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
        if(particleArray[i].size <=1){   // toremove the element as soonas it loses its visible size
            particleArray.splice(i,1);
            i--;
            console.log(particleArray);
        }
    }
}
console.log(particleArray);  // go through each and every frame of animation
function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);  //starting and ending coordinates
    ctx.fillStyle = 'rgba(0,0,0,0.02)';   // alpha particle 
    ctx.fillRect(0,0,canvas.width,canvas.height);
    handleParticles();
    hue+=5;   // this is the speed at which it cycles through whole color spectrum for creating fading effect on particle
    requestAnimationFrame(animate);   // goes infinite number of times
}
animate();