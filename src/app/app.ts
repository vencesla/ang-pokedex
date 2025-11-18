import { Component, computed, inject, signal } from '@angular/core';
import { POKEMON_LIST } from './pokemon-list.fake';
import { Pokemon } from './pokemon.model';
import { PokemonBorderDirective } from './pokemon-border';
import { DatePipe } from '@angular/common';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  imports: [
    PokemonBorderDirective,
    DatePipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Injection du service
  readonly #pokemonService = inject(PokemonService);
  readonly pokemonList = signal(this.#pokemonService.getPokemonList());
  readonly searchTerm = signal('')

  // Filtrage des Pokémons
  readonly pokemonListFiltered = computed(() => {
    const searchTerm = this.searchTerm();
    const pokemonList = this.pokemonList()

    return pokemonList.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
  })
  size(pokemon: Pokemon){
    if(pokemon.life <= 15){
      return 'Petit';
    }
    if(pokemon.life >= 25){
      return 'Grand'
    }

    return 'Moyen'
  }
  incrementLife(pokemon: Pokemon) {
    pokemon.life = pokemon.life +1;
  }

  decrementLife(pokemon:Pokemon) {
    pokemon.life = pokemon.life -1;
  }
}
