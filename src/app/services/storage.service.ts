import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Carros {
  id: number
  carName: string,
  gasolina: number,
  alcool: number,
  modified: number
}

const CAR_KEY = 'my-items'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  addCar(car: Carros): Promise<any> {
    return this.storage.get(CAR_KEY).then(
        (cars: Carros[]) => {
          if(cars) {
            cars.push(car)
            return this.storage.set(CAR_KEY, cars)
          } return this.storage.set(CAR_KEY, [car])
        }
    )
  }

  getCars(): Promise<Carros[]> {
    return this.storage.get(CAR_KEY)
  }

  editCar(car: Carros): Promise<any> {
    return this.storage.get(CAR_KEY).then(
        (cars: Carros[]) => {
          if (!cars || cars.length === 0) {
            return null
          }

          let newCars: Carros[] = []

          for (let i of cars) {
            if (i.id === car.id) {
              newCars.push(car)
            } else {
              newCars.push(i)
            }
          }
          return this.storage.set(CAR_KEY, newCars)

        }
    )
  }

  deleteCar(id: number): Promise<Carros> {
    return this.storage.get(CAR_KEY).then(
        (cars: Carros[]) => {
          if(!cars || cars.length === 0) {
            return null;
          }

          let tokeep: Carros[] = []

          for (let i of cars) {
            if (i.id !== id) {
              tokeep.push(i)
            }
          }
          return this.storage.set(CAR_KEY, tokeep)
        }
    )
  }

}
