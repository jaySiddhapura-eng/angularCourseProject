import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms'
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { relative } from 'path';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;   // by default we are creating new recipe

  recipeForm : FormGroup; // a variable which holds the form 

  constructor(private route:ActivatedRoute,
              private recipeService:RecipeService,
              private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null; // check wether id field of param is null or not
        this.initForm();
      }
    );
  }

  onSubmit(){
    const recName = this.recipeForm.value['name'];
    const recDesc = this.recipeForm.value['description'];
    const imgPath = this.recipeForm.value['imagePath'];
    const recIng = this.recipeForm.value['ingredients'];
    const newRecipe = new Recipe(recName,recDesc,imgPath,recIng);

    if(this.editMode){
      this.recipeService.updateRecipe(this.id,newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index:number){
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
      this.router.navigate(['../'], {relativeTo:this.route});
  }

  // following method is responsible for initializing our form
  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRec(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name, Validators.required),
              'amount' : new FormControl(ingredient.amount, 
                            [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

}


// if id property of param is null then set the editmode to new [dont change the default]
// if id property of param is not null then set the editmode to true [editing existing recipe]