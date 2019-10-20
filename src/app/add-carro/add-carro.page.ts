import {Component} from '@angular/core';
import {Carros, StorageService} from '../services/storage.service';
import { Platform, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-add-carro',
  templateUrl: './add-carro.page.html',
  styleUrls: ['./add-carro.page.scss'],
})
export class AddCarroPage {

  public cars: Carros[] = []
  public newCar: Carros = <Carros>{}
  public editar = false


  constructor(private storageService: StorageService, private plt: Platform, private toastCtrl: ToastController) {
    this.plt.ready().then( () => {
      this.getCars()
    })
  }

  getCars(){
    this.storageService.getCars().then(
        cars => {
          this.cars = cars
        }
    )
  }

  addCar(){

    if(!this.newCar.carName || !this.newCar.alcool || !this.newCar.gasolina) {
        this.showToast('Preencha os campos para adicionar.')
        return
    }

    this.newCar.modified = Date.now()
    this.newCar.id = Date.now()

    this.storageService.addCar(this.newCar).then(
        () => {
          this.newCar = <Carros>{}
          this.showToast('Carro adicionado com Sucesso!')
          this.getCars()
            window.location.reload()
    }
    )
        .catch( () =>
        this.showToast('Não foi possivel adicionar seu Carro!'))
  }

    editarFunction(){
      this.editar = !this.editar
  }

  editCar(car: Carros) {
    this.storageService.editCar(car).then(
        () => {
          this.showToast('Carro atualizado com Sucesso!');
          // this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
          this.getCars(); // Or update it inside the array directly
          this.editar = false
          window.location.reload()
        });
  }

  deleteCar(car: Carros) {
    this.storageService.deleteCar(car.id).then(
        () => {
          this.showToast('Carro apagado!')
          // this.mylist.closeSlidingItems();
          this.getCars()
        }
    )
  }



  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    })
    toast.present()
  }


}
