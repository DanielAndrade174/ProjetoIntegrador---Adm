import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.page.html',
  styleUrls: ['./lista-de-usuarios.page.scss'],
})
export class ListaDeUsuariosPage implements OnInit {

  listaDeUsuarios: Usuario[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  constructor(public router: Router, public loadingController: LoadingController) {

   }

 ngOnInit() {
    this.getList();
  }

  viewUsuario(obj: Usuario) {
    this.router.navigate(['/usuario-view', { 'usuario': obj.id }]);
    this.presentLoading();
  }

  Chat() {
    this.router.navigate(['/chat-usuario']);
  }

  perfilUsuario(obj: Usuario) {
    this.router.navigate(['/perfil-usuario', { 'usuario': obj.id }]);
  }

  getList() {
    var ref = firebase.firestore().collection("usuario");
    ref.get().then(query => {
      query.forEach(doc => {
        let c = new Usuario();
        c.setDados(doc.data());
        c.id = doc.id;

        let ref = firebase.storage().ref().child(`usuario/${doc.id}.jpg`).getDownloadURL().then(url => {
          c.imagem = url;

          this.listaDeUsuarios.push(c);
        })
        .catch(err=>{
         this.listaDeUsuarios.push(c);
         })
      });
    });
  }


  remove(obj: Usuario) {
    var ref = firebase.firestore().collection("usuario");
    ref.doc(obj.id).delete()
      .then(() => {
        this.listaDeUsuarios = [];
        this.getList();
      }).catch(() => {
        console.log('Erro ao atualizar');
      })
  }

  Home() {
    this.router.navigate(['/list']);
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();


  }


}
