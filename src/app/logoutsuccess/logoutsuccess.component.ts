import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logoutsuccess',
  standalone: true,
  imports: [],
  templateUrl: './logoutsuccess.component.html',
  styleUrl: './logoutsuccess.component.css'
})
export class LogoutsuccessComponent {

  constructor(public routes:Router){}
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  cancel(){
    // this.routes.navigate(['/admin'])
  }
}
