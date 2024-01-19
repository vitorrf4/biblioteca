import { Injectable } from '@angular/core';
import {enviroment} from "../../environments/enviroment.dev";
import {HttpClient} from "@angular/common/http";
import {Livro} from "../models/livro";

@Injectable({
  providedIn: 'root'
})
export class LivrosService {
  apiUrl = enviroment.apiUrl;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Livro[]>(`${this.apiUrl}/livros`);
  }

  buscarPorId(id: number) {
    return this.http.get<Livro>(`${this.apiUrl}/livros/${id}`);
  }

  cadastrar(livro: Livro) {
    return this.http.post<Livro>(`${this.apiUrl}/livros`, livro);
  }

  atualizar(livro: Livro) {
    return this.http.put(`${this.apiUrl}/livros`, livro);
  }

  deletar(id: number) {
    return this.http.delete(`${this.apiUrl}/livros/${id}`);
  }
}
