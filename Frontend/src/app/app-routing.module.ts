import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListarComponent} from "./components/listar/listar.component";
import {CadastrarComponent} from "./components/cadastrar/cadastrar.component";

const routes: Routes = [
  { path: "listar", component: ListarComponent },
  { path: "salvar", component: CadastrarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
