import { Component } from '@angular/core';
import {Livro} from "../../models/livro";
import {LivrosService} from "../../services/livros.service";

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  livros: Livro[] = [];

  constructor(private service: LivrosService) {
    service.listar().subscribe(res => {
      this.livros = res;
    });
  }
}
