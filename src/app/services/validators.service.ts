import { IMovie } from './../interfaces/movies';
import { DataService } from './data.service';
import { Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  constructor(private dataService: DataService) { }
  validatorsPoster: Validators[] = [Validators.required,
  Validators.pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)]
  validatorsName: Validators[] = [
    Validators.required,
    Validators.minLength(3),
  ]
  validatorsDate: Validators = Validators.required
}
