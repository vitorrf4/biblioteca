import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Livro} from "../../models/livro";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
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
  checkedBoxes : Genero[] = [];

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

  checkGenero(genero: Genero, checked : boolean) {
    if (checked) {
      this.checkedBoxes.push(genero);
    } else {
      this.checkedBoxes = this.checkedBoxes.filter(g => {
        return g.nome != genero.nome
      });
    }
  }

  containsAnyCheckedGenero(livro: Livro, generos: Genero[]) {
    if (generos.length == 0) {
      return true;
    }

    for (let g of generos) {
      if (livro.generos.find(gen => gen.nome == g.nome)) {
        return true;
      }
    }

    return false;
  }

  isWithinTimeFrame(dataPublicacao: Date, inicio: Date, fim: Date) {
    const maiorQueInicio = (inicio) ? dataPublicacao >= inicio : true;
    const menorQueFinal = (fim) ? dataPublicacao <= fim : true;

    return maiorQueInicio && menorQueFinal;
  }

  buscarLivro() {
    const filtros = this.queryForm.value;
    filtros.generos = this.checkedBoxes;

    const livrosFiltrados = this.allLivros.filter(l => {
      const titulo = l.titulo.toLowerCase();
      const autor = l.autor.toLowerCase();

      return titulo.search(filtros.titulo) != -1
        && autor.search(filtros.autor) != -1
        && l.copias >= filtros.areThereCopies
        && this.isWithinTimeFrame(l.dataPublicacao, filtros.dataInicial, filtros.dataFinal)
        && this.containsAnyCheckedGenero(l, filtros.generos);
    })

    this.onSearch.emit(livrosFiltrados);
  }

  limparFiltros() {
    this.queryForm.patchValue({
      titulo: '',
      autor: '',
      dataInicial: null,
      dataFinal: null,
      areThereCopies: false,
      generos: []
    });

    this.onSearch.emit(this.allLivros);
  }
}
