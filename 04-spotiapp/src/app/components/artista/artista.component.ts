import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent implements OnInit {

  artista: any = {};

  loading: boolean;

  topTracks: any[] = [];

  constructor( private router: ActivatedRoute, private spotify: SpotifyService) { 
    this.router.params.subscribe( params => {
      this.getArtista( params['id'] );
      this.getToptracks( params['id'] );
    });
  }

  getArtista( id: string)
  {
    this.loading = true;
    this.spotify.getArtista( id )
    .subscribe( artista => {
      console.log(artista);
      this.artista = artista;
      this.loading = false;
    });
  }

  getToptracks( id: string)
  {
    this.spotify.getArtistaTopTracks(id)
    .subscribe( topTracks => {
      console.log(topTracks);
      this.topTracks = topTracks;
    })
  }

  ngOnInit(): void {
  }

}
