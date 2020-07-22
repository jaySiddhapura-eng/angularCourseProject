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

  // pass the index value to this component from outside
  // this index value is coming from the recipe-list.component.html
  @Input()
  index:number;

  ngOnInit() {
  }


}
