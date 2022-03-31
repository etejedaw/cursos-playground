import Shape from "./interfaces/Shape";

class Rectangle implements Shape{
    x: number;
    y: number;
    color: string;

    constructor(x: number, y: number, color: string){
        this.x = x;
        this.y = y;
        this.color = color;
    }

    clone(): Shape{
        return new Rectangle(this.x, this.y, this.color);
    }
}

export default Rectangle;