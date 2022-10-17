import { ModalComponent } from './../modal/modal.component';
import { IMovie } from './../../interfaces/movies';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: IMovie[] = []
  filter: string = ''
  constructor(public modalService: NgbModal,
    public dataService: DataService) { }
  ngOnInit(): void {
    this.movies = this.dataService.getDataAllMovies();
  }
  open() {
    this.modalService.open(ModalComponent);
    this.dataService.status = 'Добавить фильм';
    this.dataService.action = 'add-movie'
    console.log(this.dataService.action);
  }
}
