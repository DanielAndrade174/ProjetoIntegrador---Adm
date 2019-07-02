import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-usuario',
  templateUrl: './chat-usuario.page.html',
  styleUrls: ['./chat-usuario.page.scss'],
})
export class ChatUsuarioPage implements OnInit {

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public nav: NavController) { }

  ngOnInit() {
  }

  Home() {
    this.router.navigate(['/lista-de-usuarios']);
  }

}
