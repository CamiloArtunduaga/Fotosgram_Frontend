import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServicesService } from '../../services/ui-services.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;


constructor( private usuarioService:UsuarioService,
             private navCtrl:NavController,
             private uiService:UiServicesService ) { }


  ngOnInit() {

    this.slides.lockSwipes(true);
  }


  loginUser = {
    email: 'test2@gmail.com',
    password: '123456'
  }

  registroUsuario: Usuario = {
    email: 'test',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  }

  async login( flogin:NgForm ) {
    if( flogin.invalid ){ return; }
    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );


    if( valido ){
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    }else {
      
      this.uiService.alertaInformativa('usuario y contraseña no son correctar');

    }
  }


  async registro( fRegistro:NgForm ) {

    if( fRegistro.invalid ) { return; }

     const valido = await this.usuarioService.registro( this.registroUsuario );

    if( valido ){
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    }else {
      
      this.uiService.alertaInformativa('El correo electronico ya existe');

    }

  }


  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0); 
    this.slides.lockSwipes(true);

  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
