import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServicesService {

  constructor( public alertCtrl:AlertController,
               public toastCtrl:ToastController ) { }

  async alertaInformativa( message: string ) {
    const alert = await this.alertCtrl.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
