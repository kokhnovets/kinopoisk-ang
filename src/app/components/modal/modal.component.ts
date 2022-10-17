import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  status: 'Добавить фильм' | 'Редактировать фильм' | undefined = 'Добавить фильм'
  constructor(public activeModal: NgbActiveModal, public dataService: DataService) { }
  ngOnInit(): void {
    this.status = this.dataService.status;
  }
}
