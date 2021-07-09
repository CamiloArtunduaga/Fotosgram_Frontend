import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';
import { UiServicesService } from '../../services/ui-services.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  logout() {

  }

  constructor( private usuarioService:UsuarioService,
               private uiService:UiServicesService ) {}

  ngOnInit(){

    this.usuario = this.usuarioService.getUsuario();


  }

  async actualizar( fActualizar: NgForm ){
    if( fActualizar.invalid ) { return; }
    const actualizado = await this.usuarioService.actualizarUusario( this.usuario );

    console.log(actualizado)

    if( actualizado ) {
      this.uiService.presentToast('Fue actualizado correctamente');
      // toast mensaje actualizado
    } else {
      this.uiService.presentToast('No fue actualizado');

      // mensaje de error
    }
  }

}
