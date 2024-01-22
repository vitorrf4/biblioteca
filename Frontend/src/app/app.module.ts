import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { ListarComponent } from './components/listar/listar.component';
import { HttpClientModule} from "@angular/common/http";
import { SalvarComponent } from './components/salvar/salvar.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FiltroLivrosComponent } from './components/filtro-livros/filtro-livros.component';
import { ScrollingModule } from "@angular/cdk/scrolling";

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    SalvarComponent,
    FiltroLivrosComponent
  ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		ScrollingModule
	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
