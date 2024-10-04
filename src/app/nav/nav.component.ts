import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  dropdownOpen = false;
  mobileMenuOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  signOut() {
    console.log('Sign out clicked');
    // Add your sign-out logic here.
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const clickedInsideDropdown = (event.target as HTMLElement).closest('.dropdown-content');
    const clickedOnProfile = (event.target as HTMLElement).closest('.profile-picture');
    
    if (!clickedInsideDropdown && !clickedOnProfile) {
      this.dropdownOpen = false;
    }
  }

}
