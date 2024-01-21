import { Injectable } from '@angular/core';
import {enviroment} from "../../environments/enviroment.dev";
import {HttpClient} from "@angular/common/http";
import {Livro} from "../models/livro";

@Injectable({
  providedIn: 'root'
})
export class LivrosService {
  private apiUrl = enviroment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Livro[]>(`${this.apiUrl}/livros`);
  }

  getById(id: number) {
    return this.http.get<Livro>(`${this.apiUrl}/livros/${id}`);
  }

  create(livro: Livro) {
    return this.http.post<Livro>(`${this.apiUrl}/livros`, livro);
  }

  update(livro: Livro) {
    return this.http.put(`${this.apiUrl}/livros`, livro);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/livros/${id}`);
  }
}
