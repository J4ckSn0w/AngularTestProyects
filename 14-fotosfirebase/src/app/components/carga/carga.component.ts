import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [
  ]
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];

  estaSobreDrop = false;

  constructor( public _cargaImagenes: CargaImagenesService ) { }

  ngOnInit(): void {
  }

  cargarImagenes(){
    this._cargaImagenes.cargarImagenesFirebase( this.archivos )
  }

  pruebaSobreElemento( event ){
    console.log(event);
  }

  limpiarArchivos(){
    this.archivos = [];
  }

}
