import CarBuilder from './models/builder/CarBuilder';
import CarManualBuilder from './models/builder/CarManualBuilder';
import Director from './models/Director';

const builderCar = new CarBuilder();
let director = new Director(builderCar);

director.constructSportCar();
const car1 = builderCar.getCar();
director.constructFamilyCar();
const car2 = builderCar.getCar();
const car3 = builderCar.buildEngine(1.1).buildGPS(false).buildSeats(3).getCar();
console.log(car1);
console.log(car2);
console.log(car3);

const builderManual = new CarManualBuilder()
director.setBuilder(builderManual);
director.constructSportCar();
const manual1 = builderManual.getManual()
director.constructFamilyCar();
const manual2 = builderManual.getManual();
const manual3 = builderManual.buildEngine(1.1).buildGPS(false).buildSeats(3).getManual();
console.log(manual1);
console.log(manual2);
console.log(manual3);
