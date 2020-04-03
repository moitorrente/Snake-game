class Snake {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.scale = scale;
    }
    
    update(){
        this.x += this.xspeed * scale;
        this.y += this.yspeed * scale;
        
        if(this.x > width){
            this.x = 0;
        }
        if(this.x < 0){
            this.x = width;
        }
        if(this.y > height){
            this.y = 0;
        }
        if(this.y < 0){
            this.y = height;
        }
    }

    show(){
        fill(255);
        rect(this.x, this.y, this.scale, this.scale);
    }

    setDirection(x, y){
        this.xspeed = x;
        this.yspeed = y;
    }
}

