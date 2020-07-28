import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {shoppingListService} from './shopping-list.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private idChangeSub: Subscription;

  ingredients:Ingredient[];

  constructor(private shoppingListService: shoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredient();
    this.idChangeSub = this.shoppingListService.newIngredientAdded.subscribe(
      (ingred: Ingredient[]) => {
        this.ingredients = ingred;
      }
    );
  }

  onEditItem(i : number){
    this.shoppingListService.startedEditing.next(i);
    //started editing subject is implemented in shopping list service
    // here we are just publishing the index value on that subject
  }

  ngOnDestroy():void {
    this.idChangeSub.unsubscribe();
  }




}
