import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../../environments/enviroment.dev";
import {Genero} from "../models/genero";

@Injectable({
  providedIn: 'root'
})
export class GenerosService {
  private apiUrl = enviroment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Genero[]>(`${this.apiUrl}/generos`);
  }
}
