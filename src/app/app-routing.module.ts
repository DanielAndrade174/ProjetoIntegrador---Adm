import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Auth2Guard } from './service/auth2.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [Auth2Guard]
  },
  { path: 'logoff', 
    loadChildren: './logoff/logoff.module#LogoffPageModule',
    canActivate: [Auth2Guard] 
  },
  { path: 'cadastro-de-nutricionista', loadChildren: './cadastro-de-nutricionista/cadastro-de-nutricionista.module#CadastroDeNutricionistaPageModule' },
  { path: 'lista-de-nutricionistas', loadChildren: './lista-de-nutricionistas/lista-de-nutricionistas.module#ListaDeNutricionistasPageModule' },
  { path: 'nutricionista-view', loadChildren: './nutricionista-view/nutricionista-view.module#NutricionistaViewPageModule' },
  { path: 'perfil-nutri', loadChildren: './perfil-nutri/perfil-nutri.module#PerfilNutriPageModule' },
  { path: 'chat-nutri', loadChildren: './chat-nutri/chat-nutri.module#ChatNutriPageModule' },  { path: 'cadastro-de-usuario', loadChildren: './cadastro-de-usuario/cadastro-de-usuario.module#CadastroDeUsuarioPageModule' },
  { path: 'lista-de-usuarios', loadChildren: './lista-de-usuarios/lista-de-usuarios.module#ListaDeUsuariosPageModule' },
  { path: 'perfil-usuario', loadChildren: './perfil-usuario/perfil-usuario.module#PerfilUsuarioPageModule' },
  { path: 'usuario-view', loadChildren: './usuario-view/usuario-view.module#UsuarioViewPageModule' },
  { path: 'chat-usuario', loadChildren: './chat-usuario/chat-usuario.module#ChatUsuarioPageModule' },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
