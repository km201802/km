var cv = document.getElementById("canvas");
	var ctx = cv.getContext('2d');

	cv.width = innerWidth;
	cv.height = innerHeight;

	var gravity = 0.2;
	var friction = 0.90;
	var cantidad = 150
class Fps{
    static fps = 0;
    static _sec = new Date().getSeconds();
    static lsec = 0;
    static frames = 0;
    
    static getFps(){
        this.sec = new Date().getSeconds()
        if(this.sec != this.lsec){
            this.fps = this.frames;
            this.frames = 0;
        }
        this.lsec = this.sec;
        this.frames++;
        return this.fps;
    }
    static logFps(){
        console.log(this.getFps());
    }
    static drawFps(x=300, y=50){
        ctx.font = "25px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText("FPS: "+this.getFps(), x, y);
    }
}
	
	
	function conf(){
		gravity = parseFloat(document.getElementById('gravity').value);
		friction =  parseFloat(document.getElementById('friction').value);
		cantidad = parseInt(document.getElementById('cantidad').value);
		array = [];
		draw();
	}

	// Utility Functions
	function randomIntFromRange(min,max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
	function randomColor(colors) {
		return colors[Math.floor(Math.random() * colors.length)];
	}
	class Bola{
		constructor(x, y, dx, dy, radius){
			this.x = x;
			//alert(this.x);
			this.y = y;
			this.dx = dx;
			this.dy = dy;
			this.radius = radius;
			this.color = 'cyan';
		}
		physics(){
			if (this.y + this.radius + this.dy> canvas.height) {
			this.dy = -this.dy;
			this.dy = this.dy * friction;
			this.dx = this.dx * friction;
			} else {
				this.dy += gravity;
			}
			if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
				this.dx = -this.dx * friction;
				if(this.x - this.radius <= 0){
				this.x = this.radius;
				}else{
					this.x = canvas.width - this.radius;
				}
			}
			/*if(this.x + this.radius>= canvas.width){
				vx = vx*friction;
				this.dx = -vx;
			}
			if(this.x - this.radius<= 0){
				vx = vx * friction;
				this.dx = vx;
			}
*/			if(this.y + this.radius- 5 >= canvas.height){
				this.dy = -5;
			}
			this.x += this.dx;
			this.y += this.dy;
			this.draw();
		}
		draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};
	}
	//var CBola = new Bola();

	var array = [];
	function draw(){
		for(let i = 0; i <cantidad; i++){
			var radius = randomIntFromRange(8, 20);
			var x = randomIntFromRange(radius, canvas.width - radius);
			var y = randomIntFromRange(0, canvas.height*0.85);
			var dx = randomIntFromRange(-10, 10)
			var dy = randomIntFromRange(-2, 2)
			array.push(new Bola(x, y, dx, dy, radius));
		}
	}

	//var vx = CBola.dx;
	function animate(){
		requestAnimationFrame(animate);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//CBola.physics();
		Fps.drawFps();
		for (let i = 0; i < array.length; i++) {
			array[i].physics();
		}
	}
	animate();
	draw();
