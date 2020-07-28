import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from '../shared/ingredient.model'


@Injectable()
export class shoppingListService {

    newIngredientAdded = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();     // this subject is used for editing the shopping list



    private ingredients:Ingredient[] = []; // an empty array to hold the ingredients

    getIngredient(){
        return this.ingredients.slice();
        // this way we will return the copy of the ingredient array 
        // instead of the refernce to the ingredient array
    }

    getIng(index: number){
        return this.ingredients[index];  
    } 

    // push the new ingredient through this method
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.newIngredientAdded.next(this.ingredients);
    }

    addIngredients(ing:Ingredient[]){
        this.ingredients.push(...ing); // this will push the entire array into the ingredient array
        this.newIngredientAdded.next(this.ingredients.slice());
    }

    updateIngredient(index:number, newIngredient:Ingredient){
        this.ingredients[index] = newIngredient;
        this.newIngredientAdded.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.newIngredientAdded.next(this.ingredients.slice());
    }
}
