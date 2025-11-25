import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonList } from './pokemon/pokemon-list/pokemon-list';
import { PokemonProfile } from './pokemon/pokemon-profile/pokemon-profile';
import { PageNotFound } from './page-not-found/page-not-found';

const routes: Routes = [
  { path: 'pokemons/:id', component: PokemonProfile , title: 'Pokémon'},
  { path: 'pokemons', component: PokemonList, title: 'Pokédex'},
  { path: '', redirectTo: 'pokemons', pathMatch: 'full'},
  { path: '**', component: PageNotFound},
]
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    
  ]
};
