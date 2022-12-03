import { Injectable } from '@angular/core';
///Importaciones de Firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

///Interfaces
import { Mensaje } from "../interface/mensaje.interface";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor( private afs: AngularFirestore,
                public auth: AngularFireAuth ) {
          this.auth.authState.subscribe( user => {
            console.log( 'Estado del usuario: ', user );

            if( !user ){
              return;
            }
            else{
              this.usuario.nombre = user.displayName;
              this.usuario.uid = user.uid;
            }

          } );
  }
    login( proveedor: string) {
      if(proveedor == 'google'){
        this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      }
      else{
        this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
      }
    }

    logout() {
      this.usuario = {};
      this.auth.signOut();
    }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','asc')
                                                                            .limitToLast(5));

    //return this.itemsCollection.valueChanges().map( (mensajes: Mensaje[]) => { console.log(mensajes) } );
    return this.itemsCollection.valueChanges()
    .pipe(map((mensajes:Mensaje[])=>
    {
      console.log(mensajes);
      this.chats = mensajes
    }));
  }

  agregarMensaje( texto: string ){
    // TODO falta el UID del usuario
    let mensaje: Mensaje = {
      mensaje: texto,
      nombre: this.usuario.nombre,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add( mensaje );
  }
}
