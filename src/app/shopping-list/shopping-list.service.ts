import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient } from '../shared/ingredient.model'

@Injectable()
export class shoppingListService {

    newIngredientAdded = new EventEmitter<Ingredient[]>();

    private ingredients:Ingredient[] = []; // an empty array to hold the ingredients

    getIngredient(){
        return this.ingredients.slice();
        // this way we will return the copy of the ingredient array 
        // instead of the refernce to the ingredient array
    }

    // push the new ingredient through this method
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.newIngredientAdded.emit(this.ingredients);
    }

}
