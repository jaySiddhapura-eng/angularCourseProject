import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { shoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // viewChild for name input
  @ViewChild('nameInput', {static:false}) 
  nameInputRef:ElementRef;

  @ViewChild('amountInput',{static:false}) 
  amountInputRef:ElementRef; 



  constructor(private slService:shoppingListService) { }

  ngOnInit() {
  }

  onAdd(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
  }

  onDelete(){

  }

  onClear(){

  }

}
