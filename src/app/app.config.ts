import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonList } from './pokemon/pokemon-list/pokemon-list';
import { PokemonProfile } from './pokemon/pokemon-profile/pokemon-profile';

const routes: Routes = [
  { path: 'pokemons/:id', component: PokemonProfile },
  { path: 'pokemons', component: PokemonList },
  { path: '', redirectTo: 'pokemons', pathMatch: 'full'},
]
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    
  ]
};
