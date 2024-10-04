import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  isOpen= false;

  @Output() confirm = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  open(){
    this.isOpen = true
  }

  onConfirm(){
    this.confirm.emit()
    this.isOpen = false
  }
  onCancel(){
    this.cancel.emit()
    this.isOpen = false
  }
}
