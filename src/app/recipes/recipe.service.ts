import { Injectable, EventEmitter } from "@angular/core";
import {Recipe} from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { shoppingListService } from "../shopping-list/shopping-list.service";

// a place in our app where we manage our recipes
// can be an array of the recipes  

@Injectable()
export class RecipeService {

   // a broker for recipe selected topic
   recipeSelected = new EventEmitter<Recipe>();

   constructor(private shoppingListService:shoppingListService){
   }

   private recipes:Recipe[] = [
        // creating new object of/from Recipe model
        new Recipe('Gnocchi', 
                   'An italian recipe',
                   'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',
                   [
                      new Ingredient('pasta',100),
                      new Ingredient('cheese',50),
                      new Ingredient('green',50),
                   ]),
        new Recipe('Taco', 
                   'A maxican recipe',
                   'https://www.chelseasmessyapron.com/wp-content/uploads/2018/12/Healthy-Tacos-6.jpg',
                   [
                      new Ingredient('tortila', 1),
                      new Ingredient('beans', 50),
                      new Ingredient('meat', 50)
                   ]),
        new Recipe('Mac and Cheese', 
                   'An Amarican recipe',
                   'https://pinchofyum.com/wp-content/uploads/Best-Instant-Pot-Mac-and-Cheese.jpg',
                   [
                     new Ingredient('Mac', 1),
                     new Ingredient('cheese', 50)
                   ]),
      ];



   getRecipe(){
       return this.recipes.slice();
       // because of SLICE() we are returning the copy of an array recipes
       // we are not returning the reference of the array recipe therefore this list is trully private
       // if we were sending the reference of this array then
       // whichever method has the reference of this array can modify the exact array in this service from outside
       // which we dont need, because we are trying to keep this array trully private
   }    

   addIngredientToShoppingList(ing:Ingredient[]){
      this.shoppingListService.addIngredients(ing);
   }

}