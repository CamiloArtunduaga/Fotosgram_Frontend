import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL =environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements OnInit {

  token: string = null;
  private usuario: Usuario = {};

  constructor( private http:HttpClient,
               private storage:Storage,
               private navCtrl:NavController ) { 
                 this.storage.create();
               }

  ngOnInit() {
  }


  login( email: string, password: string ) {
    const data = { email, password };

    return new Promise( resolve => {
      
      this.http.post(`${ URL }/user/login`, data).subscribe( res => {
        console.log(res);
  
        if(res['ok']) {
          this.guardarToken( res['token'] );
          resolve( true );
        }else {
          this.token = null;
          this.storage.clear();
          resolve( false );
        }
  
      });
    });

  }

  registro( usuario:Usuario ) {
    return new Promise( resolve => {

      this.http.post(`${ URL }/user/create`, usuario ).subscribe( res => {

        if( res['ok'] ) {
          this.guardarToken( res['token'] );
          resolve( true );
        }else {
          this.token = null;
          this.storage.clear();
          resolve( false );
        }

      });

    });

  }

  getUsuario(){

    if( this.usuario._id ){
      this.validaToken();
    }
    console.log(this.usuario)
    return { ...this.usuario };

  }


  async guardarToken( token: string ) {
    this.token = token;
    await this.storage.set('token', token);
  }


  async cargarToken(){

    this.token = await this.storage.get('token') || null;

  }

  async validaToken(): Promise<boolean>{


   await this.cargarToken();

   if( !this.token ){
     this.navCtrl.navigateRoot('/login');
     return Promise.resolve(false);
   }


    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });
      
      this.http.get(`${ URL }/user/`,{ headers }).subscribe( res => {
        if( res['ok'] ){
          this.usuario = res['usuario']
          resolve(true);
        }else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });

    });
  }


  actualizarUusario( usuario: Usuario ){

    return new Promise( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.post(`${ URL }/user/update`, usuario, { headers }).subscribe( resp => {
        console.log(resp)
        if( resp['ok'] ){
          this.guardarToken( resp['token'] );
          resolve(true);
        }else{
          resolve(false);
        }
      });

    });

  }

}
