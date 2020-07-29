import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms'
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;       // the obtained id is stored in this place holder
  editMode = false;   // by default we are creating new recipe

  recipeForm : FormGroup; // a variable which holds the form 

  constructor(private route:ActivatedRoute,
              private recipeService:RecipeService,
              private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];      // id of currently clicked recipe is obtained here1
        this.editMode = params['id'] != null; // check wether id field of param is null or not
        this.initForm();
      }
    );
  }

  onSubmit(){

    // gather the values for recipe from the form
    const recName = this.recipeForm.value['name'];
    const recDesc = this.recipeForm.value['description'];
    const imgPath = this.recipeForm.value['imagePath'];
    const recIng = this.recipeForm.value['ingredients'];
    const newRecipe = new Recipe(recName,recDesc,imgPath,recIng); // create the recipe here

    // if edit mode is on then update the recipe
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,newRecipe);
    } else {  // if edit mode is off then add the new recipe
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();    // go the onCancel method and execute it 
  }

  // a method which will be responsible for adding new ingredient in the recipe edit page
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  // remove individual elements
  onDeleteIngredient(index:number){
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  // simply re direct the user to ../ one level up path when this method got executed
  onCancel(){   
      this.router.navigate(['../'], {relativeTo:this.route});
  }

  // following method is responsible for initializing our form
  private initForm(){
    // default values of the form control fields
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    // if edit mode is on then fill the form field with selected recipe data
    if(this.editMode){
      const recipe = this.recipeService.getRec(this.id);  // obtain the selected recipe from its service
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){  
        for(let ingredient of recipe.ingredients){  // fill up the recipe ingredient in the field in recipe edit section
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

    // if edit mode is off then simple connect the empty control to html form templet
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