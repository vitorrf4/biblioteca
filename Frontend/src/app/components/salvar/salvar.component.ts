import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
export class SalvarComponent implements OnInit {
  form!: FormGroup;
  idFromRoute: number;
  generosList: Genero[] = [];

  constructor(private livrosService: LivrosService,
              private generoService: GenerosService,
              private router: Router,
              private fb: FormBuilder,
              route: ActivatedRoute) {
    this.idFromRoute  = Number(route.snapshot.paramMap.get('id') || 0);
  }

  ngOnInit() {
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

    if (this.idFromRoute) {
      let livroSent : Livro;
      this.livrosService.getById(this.idFromRoute).subscribe(res => {
        livroSent = res;
        this.form.patchValue(livroSent);

        for (let g of livroSent.generos) {
          this.addGenero(g);
        }
      });
    }
  }

  get generos() {
    return this.form.get('generos') as FormArray;
  }

  addGenero(genero: Genero = new Genero('')) {
    this.generos.push(this.fb.group({
      id: 0,
      nome: genero.nome
    }));
  }

  removeGenero(index: number) {
    this.generos.removeAt(index);
  }

  isLivroValid(livro: Livro) {
    if (!livro.titulo || !livro.titulo.trim()
      || !livro.autor || !livro.autor.trim()
      || !livro.dataPublicacao || livro.copias == null) {
      alert("Todos os campos devem ser preenchidos");
      return false;
    }

    if (livro.copias < 0 || livro.copias > Number.MAX_VALUE) {
      alert("Numero de cópias inválido");
      return false;
    }
1
    for (let g of livro.generos) {
      if (!g.nome) {
        alert("O gênero incluído não deve estar vazio")
        return false;
      }
    }

    return true;
  }

  onSubmit() {
    const livro: Livro = this.form.value;

    if (!this.isLivroValid(livro)) {
      return;
    }

    let salvar;

    if (this.idFromRoute) {
      salvar = this.livrosService.update(livro);
    } else {
      salvar = this.livrosService.create(livro);
    }

    salvar.subscribe({
      next: async () => {
        alert("Livro salvo com sucesso!");
        await this.router.navigateByUrl("/listar");
      },
      error: e => {
        alert("Erro na aplicação, tente mais tarde");
        console.log(e);
      }
    });

  }
}
