import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

// recipes array holds the various racipes 
// data type of racipes array is Racipe model
  recipes:Recipe[] = [
    // creating new object of/from Recipe model
    new Recipe('dummy recipe', 'this is the desc of dummy rec','https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg'),
    new Recipe('dummy recipe', 'this is the desc of dummy rec','https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg'),
    new Recipe('dummy recipe', 'this is the desc of dummy rec','https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg'),
  ];

  constructor() { }

  ngOnInit() {
  }

}


// recipes[]
// recipes : recipe[] = []
// create the new object of Recipe in the square bracket
