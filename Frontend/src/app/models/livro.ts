import {Genero} from "./genero";

export class Livro {
  id: number = 0;
  titulo: string = "";
  autor: string = "";
  dataPublicacao: Date = new Date();
  copias: number = 0;
  generos: Genero[] = [];

  constructor(titulo: string, autor: string, dataPublicacao: Date, copias: number, generos: Genero[]) {
    this.titulo = titulo;
    this.autor = autor;
    this.dataPublicacao = dataPublicacao;
    this.copias = copias;
    this.generos = generos;
  }
}
