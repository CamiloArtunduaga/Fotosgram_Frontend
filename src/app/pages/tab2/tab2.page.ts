import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { NavController } from '@ionic/angular';
import { Camera,  CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor( private postService:PostService,
               private navCtrl:NavController,
               private geolocation: Geolocation,
               private camera: Camera) {}

  tempImages: string[] = [];

  cargandoGeo = false;

  post = {
    mensaje: '',
    coords: null,
    posicion : false
  };



  async crearPost() {

    const creado = await  this.postService.crearPost( this.post );

    this.post = {
       mensaje: '',
       coords: null,
       posicion: false
    };
    
    this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true } )
  }

  getGeo() {

    if( !this.post.posicion ){
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      this.cargandoGeo = false;

      const coords = `${ resp.coords.latitude }, ${ resp.coords.longitude }`;
      console.log(coords);

      this.post.coords = coords;


     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  camara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true, // fotografia en modo porarretrato
      sourceType: this.camera.PictureSourceType.CAMERA

    };
    
    this.camera.getPicture(options).then(( imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     //let base64Image = 'data:image/jpeg;base64,' + imageData;

     const img = window.Ionic.WebView.convertFileSrc( imageData );
     console.log( img );

     this.tempImages.push( img );
    }, (err) => {
     // Handle error
    });


  }
}
