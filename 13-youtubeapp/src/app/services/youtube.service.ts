import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  youtubeUrl: string = "https://www.googleapis.com/youtube/v3/playlistItems"
  private apiKey: string = "AIzaSyB_csMUiHLQNTA8R9o6_Z7JFoB5OEteNcg";
  private playlist: string = "UUuaPTYj15JSkETGnEseaFFg"

  private nextPageToken: string = "";

  constructor( public http:HttpClient ) { }

  getVideos(){
    let url = `${ this.youtubeUrl }`;

    let headers = new HttpHeaders();
        headers  = headers.append('header-1', 'value-1');
        headers  = headers.append('header-2', 'value-2');

    let params = new HttpParams();
    params = params.append('part', 'snippet');
    params = params.append('maxResults', '10');
    params = params.append('playlistId', this.playlist);
    params = params.append('key', this.apiKey);

    if(this.nextPageToken){
      params = params.append('pageToken',this.nextPageToken);
    }


    return this.http.get( url , { params } ).pipe( map( res=>{
      console.log(res);
      this.nextPageToken = res.nextPageToken;

      let videos:any[] = [];
      for( let video of res.items){
        let snippet = video.snippet;
        videos.push(snippet);
      }

      return videos;
    } ));
  }

}
