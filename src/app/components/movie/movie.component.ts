import { ModalComponent } from './../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMovie } from './../../interfaces/movies';
import { DataService } from './../../services/data.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @ViewChild("name", { static: false })
  name: ElementRef | undefined;

  constructor(public dataService: DataService,
    public modalService: NgbModal) { }
  @Input() movie: IMovie | undefined
  @Input() i: number = 0;
  ngOnInit(): void { }
  open(): void {
    this.modalService.open(ModalComponent);
    this.dataService.status = 'Редактировать фильм';
    this.dataService.action = 'change-movie';
    console.log(this.dataService.action);
  }
  deleteMovie() {
    this.dataService.deleteMovie(this.name?.nativeElement.textContent);
  }
  redacMovie() {
    this.dataService.insertValueData(this.name?.nativeElement.textContent);
  }
}
