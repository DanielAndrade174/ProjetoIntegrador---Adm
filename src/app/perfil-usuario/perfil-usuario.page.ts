import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  perfilUsuario: Usuario = new Usuario();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  imagem;

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public nav: NavController,
    public fire : AngularFireAuth) {
      //this.id = this.fire.auth.currentUser.uid;

  this.id = this.activatedRoute.snapshot.paramMap.get('usuario');
  }

  ngOnInit() {
    this.obterPerfil();
  }

  obterPerfil() {
    var ref = firebase.firestore().collection("usuario").doc(this.id);

    ref.get().then(doc => {
        this.perfilUsuario.setDados(doc.data());
        this.perfilUsuario.id = doc.id;
        this.downloadFoto();
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }

  Chat() {
    this.router.navigate(['/chat-usuario']);
  }

   Home() {
    this.router.navigate(['/lista-de-usuarios']);
  }

  viewUsuario() {
    
    this.router.navigate(['/usuario-view', { 'usuario': this.id }]);

  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`usuario/${this.id}.jpg`);

    ref.getDownloadURL().then(url => {
      this.imagem = url;
    })
  }

  remove() {
    var ref = firebase.firestore().collection("usuario");
    ref.doc(this.id).delete()
      .then(() => {
        this.router.navigate(['/lista-de-usuarios']);
      }).catch(() => {
        console.log('Erro ao atualizar');
      })
  }

}
