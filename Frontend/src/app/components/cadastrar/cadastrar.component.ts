import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Livro} from "../../models/livro";
import {LivrosService} from "../../services/livros.service";
import {Genero} from "../../models/genero";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {
  form: FormGroup;
  id: number = 0;

  constructor(private service: LivrosService,
              private route: Router) {
    this.form = new FormGroup({
      id: new FormControl(0),
      titulo: new FormControl(null),
      autor: new FormControl(null),
      dataPublicacao: new FormControl(null),
      copias: new FormControl(null),
      generos: new FormControl([]),
    });

    const data = this.route.getCurrentNavigation()?.extras.state;

    if (data) {
      this.id = data['id'];
      this.form.patchValue(data);
    }
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
        await this.route.navigateByUrl("listar");
      },
      error: e => {
        // TODO: log errors on back not here
        alert("Erro na aplicação, tente mais tarde");
        console.log(e);
      }
    });

  }
}
