import {Component, OnInit} from '@angular/core';
import {Livro} from "../../models/livro";
import {LivrosService} from "../../services/livros.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  allLivros: Livro[] = [];
  livrosFiltrados: Livro[] = [];
  hasNoBooks = false;

  constructor(private service: LivrosService,
              private router: Router) { }

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.allLivros = res;
      this.livrosFiltrados = this.allLivros;
    });
  }

  filtrarLivros(livrosFiltrados: Livro[]) {
    this.livrosFiltrados = livrosFiltrados;
    this.hasNoBooks = !livrosFiltrados.length;
  }

  deleteLivro(id: number, index: number) {
    this.service.delete(id).subscribe({
      next: () => {
        alert("Item deletado");
        this.livrosFiltrados.splice(index, 1);
      },
      error: e => {
        alert("Erro na aplicação, tente mais tarde");
        console.log(e);
      }
    })
  }

  async goToSalvarPage(livro: Livro) {
    await this.router.navigateByUrl(`salvar/${livro.id}`, {state: livro});
  }
}
