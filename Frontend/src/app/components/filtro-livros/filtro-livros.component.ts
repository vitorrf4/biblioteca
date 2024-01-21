import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Livro} from "../../models/livro";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GenerosService} from "../../services/generos.service";
import {Genero} from "../../models/genero";

@Component({
  selector: 'app-filtro-livros',
  templateUrl: './filtro-livros.component.html',
  styleUrls: ['./filtro-livros.component.css']
})
export class FiltroLivrosComponent implements OnInit {
  @Input() allLivros : Livro[] = [];
  @Output() onSearch = new EventEmitter<Livro[]>;
  queryForm!: FormGroup;
  generos: Genero[] = [];

  constructor(private service: GenerosService,
              private form: FormBuilder) { }

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.generos = res;
    });

    this.queryForm = this.form.group({
      titulo: '',
      autor: '',
      dataInicial: null,
      dataFinal: null,
      areThereCopies: false,
      generos: []
    });
  }

  buscarLivro() {
    const filtros = this.queryForm.value;

    const livrosFiltrados = this.allLivros.filter(l => {
      const titulo = l.titulo.toLowerCase();
      const autor = l.autor.toLowerCase();

      return titulo.search(filtros.titulo) != -1
      && autor.search(filtros.autor) != -1
      && l.copias >= filtros.areThereCopies
        // && l.generos.includes(filtros.generos);
    });

    this.onSearch.emit(livrosFiltrados);
  }

  limparFiltros() {
    this.onSearch.emit(this.allLivros);
  }
}
