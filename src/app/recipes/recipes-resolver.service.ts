// this resolver code will be executed whenever the recipe route with parameter is loaded
// basically we are performing the http fethcing when user load the recipe route with the parameter

import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService,
                private recipeService : RecipeService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeService.getRecipe();
        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipes();
        } else{
            return recipes;
        }

        
    }

}