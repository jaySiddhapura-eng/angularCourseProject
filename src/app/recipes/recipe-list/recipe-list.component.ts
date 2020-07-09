import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output()
  recipeWasSelected = new EventEmitter<Recipe>();


// recipes array holds the various racipes 
// data type of racipes array is Racipe model
  recipes:Recipe[] = [
    // creating new object of/from Recipe model
    new Recipe('Gnocchi', 'An italian recipe','https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg'),
    new Recipe('Taco', 'A maxican recipe','https://www.chelseasmessyapron.com/wp-content/uploads/2018/12/Healthy-Tacos-6.jpg'),
    new Recipe('Mac and Cheese', 'An Amarican recipe','https://pinchofyum.com/wp-content/uploads/Best-Instant-Pot-Mac-and-Cheese.jpg'),
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}


// recipes[]
// recipes : recipe[] = []
// create the new object of Recipe in the square bracket
