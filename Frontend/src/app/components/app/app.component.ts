import { Component } from '@angular/core';
import {Livro} from "../../models/livro";
import {LivrosService} from "../../services/livros.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'biblioteca';
}
