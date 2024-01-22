import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListarComponent} from "./components/listar/listar.component";
import {SalvarComponent} from "./components/salvar/salvar.component";

const routes: Routes = [
  { path: "listar", component: ListarComponent },
  { path: "salvar", component: SalvarComponent },
  { path: "salvar/:id", component: SalvarComponent },
  { path: "**", redirectTo: "listar" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
