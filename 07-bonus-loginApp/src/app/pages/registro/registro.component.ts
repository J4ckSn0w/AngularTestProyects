import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  recordarme = false;


  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
   }

   onSubmit(form: NgForm){

    if(form.invalid) { return; }

    Swal.fire({
      text: 'Espere por favor...',
      icon: 'info'
    });

    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario).subscribe(resp => {
      console.log(resp);
      //Cerrramos el Swal
      Swal.close();
      if(this.recordarme)
      {
        localStorage.setItem('email',this.usuario.email);
      }
      //Cambiamos de pagina
      this.router.navigateByUrl('/home');
    },(err) => {
      console.log(err.error.error.message);

      Swal.fire({
        text: err.error.error.message,
        title: 'Error al crear',
        icon: 'error'
      });
    }
    );
   }


}
