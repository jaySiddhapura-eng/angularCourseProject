import { Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model'
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  
  recipe:Recipe;

  id: number; // this will store the id obtained from param subscribe method



  constructor(private recipeService:RecipeService,
              private router: Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    // it will not work because responsive selection of recipe is not possible with this
    // only one recipe in the beginning will be loaded 
    // and will be desplayed even if another recipe is clicked 
    //const id = this.route.snapshot.params['id']; 

    this.route.params.subscribe(
      (params:Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRec(this.id);
      }
    );

  }

  onAddToShoppingList(){
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
    //this.router.navigate(['../', this.id,'edit']), {relativeTo:this.route};
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
