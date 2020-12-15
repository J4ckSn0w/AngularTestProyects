import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: [
  ]
})
export class DataComponent {

  forma:FormGroup;

  usuario = {
    nombreCompleto: {
      nombre: "Armando",
      apellido: "Sandoval"
    },
    correo: "armando@gmail.com",
    /*pasatiempos: ["Corrrer","Dormir","Comer"]*/
  };

  constructor() {

    console.log(this.usuario);

    this.forma = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl(this.usuario.nombreCompleto.nombre, [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl(this.usuario.nombreCompleto.apellido, [Validators.required, this.noHerrera] )//Validaciones personalizadas
      }),
      'correo': new FormControl(this.usuario.correo, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])
      ,
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'username': new FormControl('',Validators.required, this.existeUsuario ),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind( this.forma )
    ]);

    this.forma.controls['username'].valueChanges
    .subscribe( data => {
      console.log(data);
    })

    this.forma.controls['username'].statusChanges
    .subscribe( data => {
      console.log(data);
    })

  }

  guardarCambios()
  {
    console.log(this.forma.value);
    console.log(this.forma);

    this.forma.reset({
      nombreCompleto:{
        nombre:"",
        apellido:""
      },
      correo:""
    });
  }

  agregarPasatiempo()
  {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  noHerrera( control: FormControl ):any {
    if(control.value == 'herrera'){
      return {
        noherrera:true
      }
    }
    return null;
  }

  noIgual( control: FormControl ):any{
    if( control.value !== this['controls']['password1'].value){
      return{
        noiguales:true
      }
    }

    return null;
  }

  existeUsuario( control: FormControl): Promise<any> | Observable<any>{
    let promesa = new Promise((resolve, reject) => {
      setTimeout( ()=> {
        if( control.value === "j4ck" ){
          resolve( {existe:true} )
        }else{
          resolve( null )
        }
      }, 3000 )
    })

    return promesa;
  }

}
