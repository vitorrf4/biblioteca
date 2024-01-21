import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../../environments/enviroment.dev";
import {Genero} from "../models/genero";

@Injectable({
  providedIn: 'root'
})
export class GenerosService {
  apiUrl = enviroment.apiUrl;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Genero[]>(`${this.apiUrl}/generos`);
  }
}
