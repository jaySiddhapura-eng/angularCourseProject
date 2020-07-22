import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

// recipes array holds the various racipes 
// data type of racipes array is Racipe model
  recipes:Recipe[];

  // obtaining the reference of recipe service as bellow
  constructor(private recipeService: RecipeService,
              private router: Router,               // for navigation purpose
              private route : ActivatedRoute ) {     // for declaration that we are in the same route location

  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipe();
    // obtain the recipe array from recipe service and assign it to this reipes
  }

  onNewRecipe(){
      this.router.navigate(['new'],{relativeTo:this.route});
  }
}


// recipes[]
// recipes : recipe[] = []
// create the new object of Recipe in the square bracket
