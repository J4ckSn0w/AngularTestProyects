import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mines';

  ngOnInit(): void {
    this.fnfillboard();
  }

  _board = [];

  fnfillboard (){
    for(var i=0;i<12;i++){
      for(var j=0;j<12;j++){
        this._board.push(i+"_"+j);
      }
    }
    this.fnGenerateMines();
  }

  fnGenerateMines(){
    var i =0;
    var j =0;

    for(var control = 0; control<15;){
      i = Math.floor(Math.random() * (12-1)+1);
      j = Math.floor(Math.random() * (12-1)+1);

      if(this._board.indexOf(i+"_"+j) >= 0){
        this._board[this._board.indexOf(i+"_"+j)] = "Bom";
        control++;
      }
    }
  }

  fnBoxNumbers(){
    for(var control = 0;control<this._board.length;control++){
      
    }
  }

}


