import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription, Subject } from 'rxjs';
import { RecipeService } from './recipe.service';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  
})
export class RecipesComponent implements OnInit, OnDestroy{
  

  constructor(private remote:DataStorageService,
              private recipService : RecipeService,
              private authService : AuthService
              ) { }

  //fetchSubscription: Subscription;
  authSubscription: Subscription;
  fetchSubscription : Subscription;

  signIn: boolean = false ;
  num = 0;

  ngOnInit() {
    //this.recipService.deleteAllRecipeLocal();

   this.authService.signInFlag.subscribe(
      response => {
        console.log(response);
      }
    );
    
      console.log('in condition');
      this.fetchSubscription  = this.remote.fetchRecipes().subscribe(
        response => {
          console.log(response);
        }
      );
    
      

  }

  ngOnDestroy(){
    
    //this.fetchSubscription.unsubscribe();
    //this.authSubscription.unsubscribe();
  }
  

}
