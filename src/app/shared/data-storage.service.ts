// this service will be responsible for communicating the firebase backend 

import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs/Operators";

@Injectable({
    providedIn:'root'
})
export class DataStorageService{

    remoteUrl:string = 'https://recipe-book-storage-c63c0.firebaseio.com/recipes.json';
    
    // http is the property which will be used futher for communicating the backend
    constructor(private http: HttpClient, private recipeService:RecipeService){
    }


    storeRecipes(){

        // obtaining the recipes from recipe service and store it in local variable
        // put request is firebase spacific, it overwrite all the data which is present in backend DB
        const recipes = this.recipeService.getRecipe();
        this.http.put(this.remoteUrl, recipes).subscribe(
            response => {
                console.log(response);
            }
        );

    }

    fetchRecipes(){
       return this.http
                .get<Recipe[]>(this.remoteUrl)

                // pipe is being used to transformed the data before we subscribe to it
                // if incoming recipe does not have any ingredients then add empty array of ingredients
                .pipe(map(recipes =>{               // this is rxjs map operator
                    return recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients:[]
                        };
                    });           // this map is javascript array method
                }),
                    tap(recipes => {
                        this.recipeService.setRecipes(recipes);
                    })
                )
    }

}