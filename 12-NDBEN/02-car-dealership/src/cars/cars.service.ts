import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ] as Car[];

  findAll() {
    return [...this.cars];
  }

  findOnById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car = {
      id: uuid(),
      ...createCarDto,
    } as Car;
    this.cars.push(car);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOnById(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id,
        } as Car;
        return carDB;
      }
      return car;
    });
    return carDB;
  }

  delete(id: string) {
    this.findOnById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
