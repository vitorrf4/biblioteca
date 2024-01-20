import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Livro} from "../../models/livro";
import {LivrosService} from "../../services/livros.service";
import {Genero} from "../../models/genero";

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {
  formularioLivro : FormGroup;

  constructor(private service: LivrosService) {
    this.formularioLivro = new FormGroup({
      id: new FormControl(0),
      titulo: new FormControl(null),
      autor: new FormControl(null),
      dataPublicacao: new FormControl(null),
      copias: new FormControl(null),
      generos: new FormControl([]),
    });
  }

  cadastrarLivro() {
    const livro: Livro = this.formularioLivro.value;

    console.log(livro);
    this.service.cadastrar(livro).subscribe(res => {
      console.log(res);
    });
  }
}
