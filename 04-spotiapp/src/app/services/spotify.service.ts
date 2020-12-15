import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) { 
    console.log("Servicio spotify LISTO");
   }


   getQuery(query: string)
   {
     const url = `https://api.spotify.com/v1/${ query }`;

     const headers = new HttpHeaders({
      'Authorization': 'Bearer BQD1OhKaLHpMN8KbaUwUGsLhGquW1kQPqnJmErHu_AzoAf38E2BHlV5Y_0AuY565wEMJn3hDRWXL0jcMh7Q'
    });

    return this.http.get(url,{headers});
   }

   getNewRealeses(){
    return this.getQuery('browse/new-releases')
    .pipe( map(data => {
      return data['albums'].items;
    }));
   }

   getArtistas(termino: string){
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
    .pipe(map(data => {
      return data['artists'].items;
    }));
   }

   getArtista(id: string){
    return this.getQuery(`artists/${ id }`);
   }

   getArtistaTopTracks(id: string){
    return this.getQuery(`artists/${ id }/top-tracks?country=MX`)
    .pipe( map( tracks => {
      return tracks['tracks'];
    }));
   }
   
}
