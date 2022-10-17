import { DataService } from './../../services/data.service';
import { IMovie } from './../../interfaces/movies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  filter: string = '';
  movieFavourites: IMovie[] = []
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.movieFavourites = this.dataService.getDataFavouriteMovies();
  }
}
