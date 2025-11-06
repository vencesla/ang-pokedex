import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  name = signal('Pikachu');
  life = signal(21);
  size = computed(
    () => this.life() <= 15 ? "Petit" : this.life() > 15 && this.life() < 25 ? "Moyen" : "Grand"
  )


  incrementLife() {
    this.life.update((life) => life +1)
  }

  decrementLife() {
    this.life.update((life) => life -1)
  }
}
