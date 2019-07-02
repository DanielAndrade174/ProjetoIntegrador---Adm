import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../model/usuario';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-usuario-view',
  templateUrl: './usuario-view.page.html',
  styleUrls: ['./usuario-view.page.scss'],
})
export class UsuarioViewPage implements OnInit {

  usuario: Usuario = new Usuario();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  imagem;

  formGroup: FormGroup; // <----

  constructor(public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router,
    public nav: NavController) {// <----
    this.id = this.activatedRoute.snapshot.paramMap.get('usuario');
    this.form(); // <---- { }
  }

  form() {// <----
    this.formGroup = this.formBuilder.group({
      nome: [this.usuario.nome],
      endereco: [this.usuario.endereco],
      telefone: [this.usuario.telefone],
      email: [this.usuario.email],
      senha: [this.usuario.senha],
    });
  }

  ngOnInit() {
    this.downloadFoto();
    this.obterUsuario();
  }

  obterUsuario() {
    var ref = firebase.firestore().collection("usuario").doc(this.id);

    ref.get().then(doc => {
      this.usuario.setDados(doc.data());
      this.form();

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }

  atualizar() {
    let ref = this.firestore.collection('usuario')
    ref.doc(this.id).set(this.formGroup.value)
      .then(() => {
        console.log('Atualizado com sucesso');
        this.nav.navigateRoot('/lista-de-usuarios');
      }).catch(() => {
        console.log('Erro ao Atualizar');
      })
  }

  enviaArquivo(event) {
    let imagem = event.srcElement.files[0];
    //console.log(imagem.name);
    let ref = firebase.storage().ref()
      .child(`usuario/${this.id}.jpg`);

    ref.put(imagem).then(url => {
      console.log("Enviado com sucesso!");
      this.downloadFoto();
    })

  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`usuario/${this.id}.jpg`);

    ref.getDownloadURL().then(url => {
      this.imagem = url;
    })
  }

  Home() {
    this.router.navigate(['/lista-de-usuarios']);
  }


}
