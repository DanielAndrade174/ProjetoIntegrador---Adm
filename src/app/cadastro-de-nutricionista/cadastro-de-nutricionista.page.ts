import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-cadastro-de-nutricionista',
  templateUrl: './cadastro-de-nutricionista.page.html',
  styleUrls: ['./cadastro-de-nutricionista.page.scss'],
})
export class CadastroDeNutricionistaPage implements OnInit {

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  formGroup : FormGroup;

  constructor(private formBuilder : FormBuilder, 
    private router : Router,
    public fire : AngularFireAuth) {

      this.formGroup = this.formBuilder.group({
        nome : [''],
        endereco : [''],
        telefone : [''],
        email : [''],
        senha : [''],
     });

    }

  ngOnInit() {
  }
  
  executarCadastro(){
    let ref = this.firestore.collection('nutricionista').doc(this.fire.auth.currentUser.uid);
    ref.get().then(doc => {
     
      console.log(doc.data());
    });

  }

  cadastrar(){
    let ref = this.firestore.collection('nutricionista').doc(this.fire.auth.currentUser.uid).set(this.formGroup.value).then(function(){
      console.log('Cadastrado com sucesso');
    }).catch(function(){
      console.log('Erro ao cadastrar');
    })
  }

  Home() {
    this.router.navigate(['/list']);
  }

  }

