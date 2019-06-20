import { Component, OnInit } from '@angular/core';
import { Nutricionista } from '../model/nutricionista';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-perfil-nutri',
  templateUrl: './perfil-nutri.page.html',
  styleUrls: ['./perfil-nutri.page.scss'],
})
export class PerfilNutriPage implements OnInit {

  perfilNutri: Nutricionista = new Nutricionista();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  imagem;

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public nav: NavController,
    public fire : AngularFireAuth) {
      //this.id = this.fire.auth.currentUser.uid;

  this.id = this.activatedRoute.snapshot.paramMap.get('nutricionista');
  }

  ngOnInit() {
    this.obterPerfil();
  }

  obterPerfil() {
    var ref = firebase.firestore().collection("nutricionista").doc(this.id);

    ref.get().then(doc => {
        this.perfilNutri.setDados(doc.data());
        this.perfilNutri.id = doc.id;
        this.downloadFoto();
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }

  Chat() {
    this.router.navigate(['/chat-nutri']);
  }

   Home() {
    this.router.navigate(['/lista-de-nutricionistas']);
  }

  viewNutri() {
    
    this.router.navigate(['/nutricionista-view', { 'nutricionista': this.id }]);

  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`nutri/${this.id}.jpg`);

    ref.getDownloadURL().then(url => {
      this.imagem = url;
    })
  }

  remove() {
    var ref = firebase.firestore().collection("nutricionista");
    ref.doc(this.id).delete()
      .then(() => {
        this.router.navigate(['/lista-de-nutricionistas']);
      }).catch(() => {
        console.log('Erro ao atualizar');
      })
  }

}
