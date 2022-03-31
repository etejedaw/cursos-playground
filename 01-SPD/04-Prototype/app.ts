// import Circle from "./models/Circle";
import Rectangle from "./models/Rectangle";
import Circle from "./models/Circle";
import Shape from "./models/interfaces/Shape"

let shapes: Shape[] = [];
let circle = new Circle(1, 1, 1, "red");
let anotherCircle = circle.clone();
let rectangle = new Rectangle(2, 2, "blue");
shapes.push(circle, anotherCircle, rectangle);

let shapesCopy: Shape[] = [];
shapesCopy = shapes.map(shape => shape.clone());

console.log(shapes);
console.log(shapesCopy);