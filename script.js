(function(){
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    h = canvas.height = innerHeight,
    w = canvas.width = innerWidth,
    particles = [],
    properties = {
        bgColor : 'rgba(0, 0, 0, 1)',
        particleColor : 'rgba(72, 232, 39, 1)',
        particlRadius : 3,
        particlCount : 160,
        particlemAXvELOCITY : 0.5,
        lineLength : 360,
        particleLife : 36,
        
    };

    document.querySelector('body').appendChild(canvas);
    
    window.onresize = function () {
        h = canvas.height = innerHeight,
        w = canvas.width = innerWidth;
    }

    class Particle{
        constructor(){
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.velocityX = Math.random()*(properties.particlemAXvELOCITY*2)-properties.particlemAXvELOCITY;
            this.life = Math.random()*properties.particleLife*60;
            this.velocityY = Math.random()*(properties.particlemAXvELOCITY*2)-properties.particlemAXvELOCITY;
        }
        position(){
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX<0? this.velocityX*=-1 : this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY<0? this.velocityY*=-1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        reDraw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particlRadius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }

        reCalculateLife(){
            if(this.life < 1){
                this.x = Math.random()*w;
                this.y = Math.random()*h;
                this.velocityX = Math.random()*(properties.particlemAXvELOCITY*2)-properties.particlemAXvELOCITY;
                this.velocityY = Math.random()*(properties.particlemAXvELOCITY*2)-properties.particlemAXvELOCITY;
                this.life = Math.random()*properties.particleLife*60;
            }
            this.life--;
        }

    }

    function reDrawParticles() {
        for (let i in particles) {
            particles[i].reCalculateLife();
            particles[i].position();
            particles[i].reDraw();
            
        } 
    }


    function reDrawBackground() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);  
    }

    function deawLines() {
        var x1, y1, x2, y2, length, opacity;
        for (var i in particles) {
            for (var j in particles) {
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
                if (length < properties.lineLength) {
                    opacity = 1-length/properties.lineLength;
                    ctx.lineWidth = '0.5';
                    ctx.strokeStyle = 'rgba(39, 232, 39, '+opacity+')';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                    
                }

            }    
            }
        }
        
    

    function loop() {

        reDrawBackground();
        reDrawParticles();
        deawLines();
        requestAnimationFrame(loop);
    }



    function init() {
        for (let index = 0; index < properties.particlCount; index++) {
            particles.push(new Particle);
            
        }
        loop();
    }

    init();

}())