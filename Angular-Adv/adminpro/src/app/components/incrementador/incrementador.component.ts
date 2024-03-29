import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
  }
  
  ngOnInit(): void {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  onChanges( newValue: number ){

    //let elementoHTML:any = document.getElementsByName('progreso')[0];

    //console.log(this.txtProgress);

    if( newValue >= 100 ){
      this.progreso = 100;
    } else if( newValue <= 0){
      this.progreso = 0
    }
    else{
      this.progreso = newValue;
    }

    //elementoHTML.value = Number(this.progreso);
    this.txtProgress.nativeElement = this.progreso;

    this.cambioValor.emit( this.progreso );
  }

  cambiarValor( valor: number ){
    if((this.progreso >= 100 && valor > 0) || (this.progreso <= 0 && valor < 0))
    {
      return;
    }
    this.progreso = this.progreso + valor;

    this.cambioValor.emit( this.progreso );

    this.txtProgress.nativeElement.focus();

  }

}
