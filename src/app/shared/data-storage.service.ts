// this service will be responsible for communicating the firebase backend 

import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap, take, exhaustMap } from "rxjs/Operators";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

@Injectable({
    providedIn:'root'
})
export class DataStorageService{

    remoteUrl:string = 'https://recipe-book-storage-c63c0.firebaseio.com/recipes.json';

    userId;

    newLink;


    private currentUser:User;
    
    // http is the property which will be used futher for communicating the backend
    constructor(private http: HttpClient, 
        private recipeService:RecipeService,
        private authService : AuthService){
    }


    storeRecipes(){

        this.authService.user.subscribe(
            user => {
                if(user != null){
                    this.userId = user.id;
                }
                
            }
        );

        this.newLink = 'https://recipe-book-storage-c63c0.firebaseio.com/' + this.userId + '.json';

        const recipes = this.recipeService.getRecipe();
        this.http.put(this.newLink, recipes).subscribe(
            response => {
                console.log(response);
            }
        );


        // obtaining the recipes from recipe service and store it in local variable
        // put request is firebase spacific, it overwrite all the data which is present in backend DB

        // const recipes = this.recipeService.getRecipe();
        // this.http.put(this.remoteUrl, recipes).subscribe(
        //     response => {
        //         console.log(response);
        //     }
        // );

    }

    fetchRecipes(){

        this.authService.user.subscribe(
            user => {
                if(user != null){
                    this.userId = user.id;
                }
            }
        );

        this.newLink = 'https://recipe-book-storage-c63c0.firebaseio.com/' + this.userId + '.json';

        
        return this.http.get<Recipe[]>(this.newLink).pipe(
            map(recipes =>{               // this is rxjs map operator


                    return recipes.map(recipe => {
                                            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients:[]};
                                       });           // this map is javascript array method
                   }
               ),tap(recipes => {
                   this.recipeService.setRecipes(recipes);
       })
)

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        // return this.http.get<Recipe[]>(this.remoteUrl).pipe(
        //                  map(recipes =>{               // this is rxjs map operator
        //                          return recipes.map(recipe => {
        //                                                  return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients:[]};
        //                                             });           // this map is javascript array method
        //                         }
        //                     ),tap(recipes => {
        //                         this.recipeService.setRecipes(recipes);
        //             })
        // )
    }

}