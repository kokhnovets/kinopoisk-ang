import { IMovie } from './../interfaces/movies';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMovies'
})
export class FilterMoviesPipe implements PipeTransform {

  transform(movies: IMovie[], search: string): IMovie[] {
    if (search.length === 0) return movies;
    return movies.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  }

}
