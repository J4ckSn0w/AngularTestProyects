import { Injectable } from '@angular/core';

import { JsonpInterceptor } from '@angular/common/http';
import 'rxjs/Rx'; // Map

@Injectable()
export class PeliculasService {

  private apikey:string = "43b813fbc92e92bed0c5429dad3224b6";
  private urlMoviedb:string = "https://api.themoviedb.org/3";

  constructor( private jsonp:JsonpInterceptor ) { }

  getPopulares(){

    let url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.intercept.call( url ).map( res => res.json );

    // return this.jsonp.get( url )
    //             .map( res=> res.json());
  }

  buscarPelicula( texto:string ){

    let url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    // return this.jsonp.get( url )
    //             .map( res=> res.json());
  }

  getCartelera(){
    let desde = new Date();
    let hasta = new Date();

    hasta.setDate( hasta.getDate() + 7 );

    let desdeStr = `${ desde.getFullYear() }-${ desde.getMonth()+1 }-${ desde.getDate() }`
    let hastaStr = `${ hasta.getFullYear() }-${ hasta.getMonth()+1 }-${ hasta.getDate() }`

    let url = `${ this.urlMoviedb }/discover/movie?primary_release_date.gte=${ desdeStr }&primary_release_date.lte=${ hastaStr }&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    // return this.jsonp.get( url )
    //             .map( res=> res.json());
  }
}
