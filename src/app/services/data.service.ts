import { ValidatorsService } from './validators.service';
import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup, Validators } from '@angular/forms';
import { IMovie } from './../interfaces/movies';
import { Injectable } from '@angular/core';

export class Movie {
  constructor(public poster: string, public name: string, public date: string, public inFavourite: boolean = false) { }
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  movies: IMovie[] = []
  keyLocalStorageMovies: string = 'movies';
  favouriteMovies: IMovie[] = []
  status: 'Добавить фильм' | 'Редактировать фильм' = 'Редактировать фильм';
  action: 'add-movie' | 'change-movie' | undefined
  changePoster: string = ''
  changeName: string = ''
  changeDate: string = ''
  changeInFavourite: boolean = false;

  // Чтение фильмов из localStorage
  getDataAllMovies(): IMovie[] {
    this.movies = [];
    if (localStorage.getItem(this.keyLocalStorageMovies)) {
      this.movies = JSON.parse(localStorage.getItem(this.keyLocalStorageMovies)!);
      return this.movies
    }
    return this.movies;
  }
  getDataFavouriteMovies(): IMovie[] {
    this.favouriteMovies = [];
    if (localStorage.getItem(this.keyLocalStorageMovies)) {
      for (let movie of JSON.parse(localStorage.getItem(this.keyLocalStorageMovies)!)) {
        if (movie.inFavourite) {
          this.favouriteMovies.push(movie);
        }
      }
    }
    return this.favouriteMovies;
  }
  // Запись фильма
  setData<T extends string>(poster: T, name: T, date: T): void {
    this.movies.push(new Movie(poster, name, date))
    this.loadMovieInJSON(this.keyLocalStorageMovies, this.movies)
  }
  // Запись  в JSON и сохранение в localStorage
  loadMovieInJSON(key: string, movies: IMovie[]) {
    localStorage.setItem(key, JSON.stringify(movies));
    this.getDataAllMovies();
    this.getDataFavouriteMovies();
  }
  // Удаление фильма
  deleteMovie(name: string): void {
    this.movies.forEach((item: IMovie, i) => {
      if (item.name === name.trim()) {
        this.movies.splice(i, 1)
        this.loadMovieInJSON(this.keyLocalStorageMovies, this.movies);
      }
    })
  }
  // Вставка полей для редактирования фильма
  insertValueData(name: string): void {
    this.movies.forEach((item: IMovie) => {
      if (item.name === name.trim()) {
        this.changePoster = item.poster;
        this.changeName = item.name;
        this.changeDate = item.date;
        this.changeInFavourite = item.inFavourite;
      }
    })
  }
  // Изменение чекбокса "Избранное"
  cheked(name: string): void {
    this.movies.forEach((item: IMovie) => {
      if (item.name === name.trim()) {
        item.inFavourite = !item.inFavourite
        this.loadMovieInJSON(this.keyLocalStorageMovies, this.movies);
      }
    })
  }
  // Валидатор проверки на существующие фильмы при создании


  checkNameMovieValidator(movies: IMovie[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        return movies.find((item: IMovie) => control.value.trim() === item.name) ? { 'duplicateName': true } : null;
      } return null;
    }
  }

  // Валидатор проверки на существующие фильмы при редактировании
  checkNameMovieEditValidator(movies: IMovie[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        if (control.value.trim() != this.changeName) {
          return movies.find((item: IMovie) => control.value.trim() === item.name) ? { 'duplicateName': true } : null;
        } return null;
      } return null;
    }
  }
  // Редактирование фильма
  changeValueData<T extends string>(poster: T, name: T, date: T): void {
    if (this.changeName != name) {
      const index = this.movies.findIndex(p => p.name == this.changeName);
      this.movies[index].poster = poster;
      this.movies[index].name = name;
      this.movies[index].date = date;
      this.loadMovieInJSON(this.keyLocalStorageMovies, this.movies)
    } else {
      const index = this.movies.findIndex(p => p.name == this.changeName);
      this.movies[index].poster = poster;
      this.movies[index].name = name;
      this.movies[index].date = date;
      this.loadMovieInJSON(this.keyLocalStorageMovies, this.movies)
    }
  }
}
