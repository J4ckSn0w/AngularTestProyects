import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from '../../services/heroes.service';
import { HeroeComponent } from '../heroe/heroe.component';
import { Router } from '@angular/router';




@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [
  ]
})
export class HeroesComponent implements OnInit {


  heroes:Heroe[] = [];

  constructor( private _heoresService:HeroesService, private router:Router ) { //Importando el servicio
    //console.log("Constructor")
  }

  ngOnInit(): void {
    this.heroes = this._heoresService.getHeroes();
    //console.log(this.heroes);
  }

  verHeroe(index:number)
  {
    this.router.navigate(['/heroe',index]);
    console.log(index);
  }

}
