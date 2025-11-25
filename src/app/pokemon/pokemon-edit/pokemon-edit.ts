import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-edit',
  imports: [
    RouterLink, 
    ReactiveFormsModule,
  ],
  templateUrl: './pokemon-edit.html',
  styles: ``
})
export class PokemonEdit {
  readonly #route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);

  readonly #pokemonId = Number(this.#route.snapshot.paramMap.get('id'));

  readonly pokemon = signal(
    this.pokemonService.getPokemonById(this.#pokemonId)
  ).asReadonly()

  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name),
    life: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
    types: new FormArray(this.pokemon().types.map((type) => new FormControl(type))
    ),
  })

  get pokemonTypeList(): FormArray {
    return this.form.get('types') as FormArray;
  }

  isPokemontypeSelected(type: string): boolean {
    return !!this.pokemonTypeList.controls.find(
      (control) => control.value === type
    )
  }

  onPokemonTypeChange(type: string, isChecked: boolean) {
    if(isChecked) {
      const control = new FormControl(type);
      this.pokemonTypeList.push(control);
    }else{
      const index = this.pokemonTypeList.controls.map(
        (control) => control.value
      ).indexOf(type)

      this.pokemonTypeList.removeAt(index);
    }
  }

  onSubmit(){
    console.log(this.form.value)
  }
}
