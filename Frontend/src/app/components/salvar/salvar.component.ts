import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Livro} from "../../models/livro";
import {LivrosService} from "../../services/livros.service";
import {Genero} from "../../models/genero";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cadastrar',
  templateUrl: './salvar.html',
  styleUrls: ['./salvar.component.css']
})
export class SalvarComponent {
  form: FormGroup;
  id: number = 0;

  constructor(private service: LivrosService,
              private route: Router,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [0],
      titulo: [''],
      autor: [''],
      dataPublicacao: [new Date()],
      copias: [0],
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

  get generos(): FormArray {
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

  onSubmit() {
    const livro: Livro = this.form.value;
    let salvar;

    if (this.id) {
      salvar = this.service.atualizar(livro);
    } else {
      salvar = this.service.cadastrar(livro);
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
