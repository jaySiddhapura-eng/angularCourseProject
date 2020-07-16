import { Injectable, EventEmitter } from "@angular/core";
import {Recipe} from "./recipe.model";

// a place in our app where we manage our recipes
// can be an array of the recipes  

@Injectable()
export class RecipeService {

   // a broker for recipe selected topic
   recipeSelected = new EventEmitter<Recipe>();

   private recipes:Recipe[] = [
        // creating new object of/from Recipe model
        new Recipe('Gnocchi', 'An italian recipe','https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg'),
        new Recipe('Taco', 'A maxican recipe','https://www.chelseasmessyapron.com/wp-content/uploads/2018/12/Healthy-Tacos-6.jpg'),
        new Recipe('Mac and Cheese', 'An Amarican recipe','https://pinchofyum.com/wp-content/uploads/Best-Instant-Pot-Mac-and-Cheese.jpg'),
      ];



   getRecipe(){
       return this.recipes.slice();
       // because of SLICE() we are returning the copy of an array recipes
       // we are not returning the reference of the array recipe therefore this list is trully private
       // if we were sending the reference of this array then
       // whichever method has the reference of this array can modify the exact array in this service from outside
       // which we dont need, because we are trying to keep this array trully private
   }    

}