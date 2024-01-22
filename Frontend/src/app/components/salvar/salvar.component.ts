import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Livro} from "../../models/livro";
import {LivrosService} from "../../services/livros.service";
import {Genero} from "../../models/genero";
import {ActivatedRoute, Router} from "@angular/router";
import {GenerosService} from "../../services/generos.service";

@Component({
  selector: 'app-cadastrar',
  templateUrl: './salvar.html',
  styleUrls: ['./salvar.component.css']
})
export class SalvarComponent {
  form: FormGroup;
  id: number = 0;
  generosList: Genero[] = [];

  get debug() {
    return this.form.value;
  }

  constructor(private livrosService: LivrosService,
              private generoService: GenerosService,
              private route: Router,
              private fb: FormBuilder) {

    this.generoService.getAll().subscribe(res => {
      this.generosList = res;
    });

    this.form = this.fb.group({
      id: [0],
      titulo: [null, Validators.required],
      autor: [null, Validators.required],
      dataPublicacao: [null, Validators.required],
      copias: [0, Validators.required],
      generos: this.fb.array([]),
    });

    const livroFromList = this.route.getCurrentNavigation()?.extras.state;

    if (livroFromList) {
      this.id = livroFromList['id'];
      this.form.patchValue(livroFromList);

      for (let g of livroFromList['generos']) {
        this.addGenero(g);
      }
    }
  }

  get generos() {
    return this.form.get('generos') as FormArray;
  }

  addGenero(genero: Genero = new Genero('')) {
    this.generos.push(this.fb.group({
      id: genero.id,
      nome: genero.nome
    }));
  }

  removeGenero(index: number) {
    this.generos.removeAt(index);
  }

  validarLivro(livro: Livro) {
    if (!livro.titulo || !livro.autor || !livro.dataPublicacao
      || livro.copias == null) {
      alert("Todos os campos devem ser preenchidos");
      return false;
    }

    if (livro.copias < 0 || livro.copias > Number.MAX_VALUE) {
      alert("Numero de cópias inválido");
      return false;
    }

    for (let g of livro.generos) {
      if (!g.nome) {
        alert("O nome do gênero não deve estar vazio")
        return false;
      }
    }

    return true;
  }

  onSubmit() {
    const livro: Livro = this.form.value;

    if (!this.validarLivro(livro)) {
      return;
    }

    let salvar;

    if (this.id) {
      salvar = this.livrosService.update(livro);
    } else {
      salvar = this.livrosService.create(livro);
    }

    salvar.subscribe({
      next: async () => {
        await this.route.navigateByUrl("/listar");
      },
      error: e => {
        // TODO: log errors on back not here
        alert("Erro na aplicação, tente mais tarde");
        console.log(e);
      }
    });

  }
}
