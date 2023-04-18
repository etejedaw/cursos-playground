import Shape from "./interfaces/Shape";

class Circle implements Shape{
    x: number;
    y: number;
    color: string;
    radius: number

    constructor(x: number, y: number, radius: number, color: string){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    clone(): Shape{
        return new Circle(this.x, this.y, this.radius, this.color);
    }
}

export default Circle;