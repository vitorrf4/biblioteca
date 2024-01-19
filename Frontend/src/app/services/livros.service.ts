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
}
