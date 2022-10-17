import { ValidatorsService } from './../../services/validators.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './../../services/data.service';
import { IMovie } from './../../interfaces/movies';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  status: 'Добавить фильм' | 'Редактировать фильм' = 'Добавить фильм'
  movies: IMovie[] = []
  constructor(
    public dataService: DataService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService
  ) { }
  ngOnInit(): void {
    this.status = this.dataService.status;
    this.updateMovie();
    if (this.dataService.action === 'add-movie') {
      this.myForm.reset();
    }
    // this.movies = this.dataService.getDataAllMovies();
  }
  myForm: FormGroup = this.formBuilder.group({
    poster: ['', this.validatorsService.validatorsPoster],
    name: ['', [(this.dataService.action == 'add-movie') ?
      //Валидатор проверки существующих фильмов (работает, но при true не выводит alert-danger)
      this.dataService.checkNameMovieValidator(this.dataService.getDataAllMovies()) :
      this.dataService.checkNameMovieEditValidator(this.dataService.getDataAllMovies()),
    ...this.validatorsService.validatorsName]],
    date: ['', this.validatorsService.validatorsDate]
  })
  updateMovie() {
    this.myForm.setValue({
      poster: this.dataService.changePoster,
      name: this.dataService.changeName,
      date: this.dataService.changeDate
    })
  }
  submit() {
    if (this.dataService.action === 'add-movie') {
      this.dataService.setData(this.myForm.controls['poster'].value,
        this.myForm.controls['name'].value,
        this.myForm.controls['date'].value);
    } else if (this.dataService.action === 'change-movie') {
      this.dataService.changeValueData(this.myForm.controls['poster'].value,
        this.myForm.controls['name'].value,
        this.myForm.controls['date'].value)
    }
    this.activeModal.close();
  }
}
