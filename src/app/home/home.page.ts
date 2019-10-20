import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import {Carros, StorageService} from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [StorageService]
})
export class HomePage {

  public cars: Carros[] = []
  public custoKmGasolina
  public custoKmAlcool
  public resultado70
  public melhorOpt: string
  public opt: string
  public precoAtualGasolina
  public precoAtualAlcool


  public carSelecionado: Carros = <Carros>{}
  private consumoGasolina
  private consumoAlcool

  constructor(private plt: Platform, private toastCtrl: ToastController, private storageService: StorageService) {
    this.plt.ready().then(() => {
      this.getCars()
    })
  }

    async getCars(){
     await this.storageService.getCars().then(
        cars => {
          this.cars = cars
        }
    )
    }

    calcular70(){
      this.resultado70 = this.precoAtualGasolina * 0.7;
      this.opt = 'Opção baseada na diferença de 70%'
      if(this.precoAtualAlcool < this.resultado70) {
        this.melhorOpt = 'Alcool.';
      } else {
        this.melhorOpt = 'Gasolina'
      }
    }

    async calcular(){
      if(this.precoAtualGasolina === undefined || this.precoAtualAlcool === undefined) {
        this.showToast('Preencha os valores atuais de Combustível.')
      }
      else if (!this.carSelecionado) {
          this.custoKmGasolina = undefined
          this.custoKmAlcool = undefined
          await this.calcular70();
        }
      else {
        this.consumoGasolina = this.carSelecionado.gasolina
        this.consumoAlcool = this.carSelecionado.alcool
        this.custoKmGasolina = this.precoAtualGasolina / this.consumoGasolina
        this.custoKmAlcool = this.precoAtualAlcool / this.consumoAlcool
        this.opt = 'Calculado em cima do consumo do seu carro.'

        if (this.custoKmGasolina <= this.custoKmAlcool) {
          this.melhorOpt = 'Gasolina!'
        } else {
          this.melhorOpt = 'Alcool!'
        }
      }
    }

    showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present())
    }


}
