import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;

  error = false;
  errorMessage: string;

  constructor( private spotify: SpotifyService ) {
    this.loading = true;
    this.spotify.getNewRealeses()
    .subscribe( (data: any) => {
      this.nuevasCanciones = data;
      this.loading = false;
    }, ( error ) =>{
      this.error = true;
      this.loading = false;
      this.errorMessage = error.error.error.message;
    });
  }


  ngOnInit(): void {
  }

}
