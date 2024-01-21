import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Livro} from "../../models/livro";

@Component({
  selector: 'app-filtro-livros',
  templateUrl: './filtro-livros.component.html',
  styleUrls: ['./filtro-livros.component.css']
})
export class FiltroLivrosComponent {
  @Input() allLivros : Livro[] = [];
  @Output() onSearch = new EventEmitter<Livro[]>;

  buscarLivro(query: string) {
    const tituloQuery = query.toLowerCase();

    const livrosFiltrados = this.allLivros.filter(l => {
      const titulo = l.titulo.toLowerCase();
      return titulo.search(tituloQuery) != -1;
    });

    this.onSearch.emit(livrosFiltrados);
  }
}
