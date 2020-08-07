import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

// recipes array holds the various racipes 
// data type of racipes array is Racipe model
  recipes:Recipe[];

  subscription:Subscription;

  // obtaining the reference of recipe service as bellow
  constructor(private recipeService: RecipeService,
              private router: Router,               // for navigation purpose
              private route : ActivatedRoute ) {     // for declaration that we are in the same route location

  }

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes:Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipe();
    // obtain the recipe array from recipe service and assign it to this reipes
  }

  onNewRecipe(){
      this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.recipes = [];
  }
}


// recipes[]
// recipes : recipe[] = []
// create the new object of Recipe in the square bracket
