import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Livro} from "../../models/livro";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filtro-livros',
  templateUrl: './filtro-livros.component.html',
  styleUrls: ['./filtro-livros.component.css']
})
export class FiltroLivrosComponent {
  @Input() allLivros : Livro[] = [];
  @Output() onSearch = new EventEmitter<Livro[]>;
  queryForm : FormGroup;

  constructor(form: FormBuilder) {
    this.queryForm = form.group({
      titulo: '',
      autor: '',
      dataInicial: null,
      dataFinal: null,
      areThereCopies: true
    });
  }

  buscarLivro() {
    const filtro = this.queryForm.value;

    const livrosFiltrados = this.allLivros.filter(l => {
      const titulo = l.titulo.toLowerCase();
      const autor = l.autor.toLowerCase();

      return titulo.search(filtro.titulo) != -1 &&
        autor.search(filtro.autor) != -1;
    });

    this.onSearch.emit(livrosFiltrados);
  }
}
