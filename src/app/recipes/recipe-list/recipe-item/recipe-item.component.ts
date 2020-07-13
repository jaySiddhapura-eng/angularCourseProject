import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() 
  recipe: Recipe; // variable recipe is the type Recipe from model
  // the value of recipe is obtained from recipe list component

  @Output()
  recipeSelected = new EventEmitter<void>();
  

  constructor() { }

  ngOnInit() {
  }

  onSelected(){
    //console.log('the recipe selected');
    this.recipeSelected.emit();
  }

}
