import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal-success',
  standalone: true,
  imports: [],
  templateUrl: '../templates/modal-success.component.html',
  styleUrl: '../css/modal-success.component.css'
})
export class ModalSuccessComponent {
  @Input() header: string = 'this is header';
  @Input() content: string = 'this is the content';
  @Output() closeModal = new EventEmitter();

  onCloseModal () {
    this.closeModal.emit("close");
  }
}
