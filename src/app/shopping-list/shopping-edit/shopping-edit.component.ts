import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  ingredients:Ingredient[] = [];  // an array which holds the ingredients

  // viewChild for name input
  @ViewChild('nameInput', {static:false}) 
  nameInputRef:ElementRef;

  @ViewChild('amountInput',{static:false}) 
  amountInputRef:ElementRef; 

  @Output()
  ingredientAdded = new EventEmitter<Ingredient>();


  constructor() { }

  ngOnInit() {
  }

  onAdd(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.ingredientAdded.emit(newIngredient);
  }

  onDelete(){

  }

  onClear(){

  }

}
