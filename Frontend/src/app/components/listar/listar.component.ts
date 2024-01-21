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
  allLivos: Livro[] = [];
  livrosFiltrados: Livro[] = [];
  hasNoBooks = false;

  constructor(private service: LivrosService,
              private router: Router) { }

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.allLivos = res;
      this.livrosFiltrados = this.allLivos;
    });
  }

  buscarLivro(query: string) {
    const tituloQuery = query.toLowerCase();
    this.livrosFiltrados = this.allLivos.filter(l => {
      const titulo = l.titulo.toLowerCase();
      return titulo.search(tituloQuery) != -1;
    });

    if (this.livrosFiltrados.length == 0) {
      return this.hasNoBooks = true;
    }

    return this.hasNoBooks = false;
  }

  deletarLivro(id: number, index: number) {
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

  async irParaSalvarPagina(livro: Livro) {
    await this.router.navigateByUrl(`salvar/${livro.id}`, {state: livro});
  }
}
