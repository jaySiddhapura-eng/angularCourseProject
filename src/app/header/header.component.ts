import {Component, Output, EventEmitter} from '@angular/core'
import { Recipe } from '../recipes/recipe.model';

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrls: ['./header.component.css']
}
)
export class HeaderComponent{

    // creating the event emitter
   @Output() featureSelected = new EventEmitter<string>();
     

    //collapsed = true;

    onRecipes(){
       this.featureSelected.emit('recipes');   // emmiting the event on button click
    }

    onShopping(){
        this.featureSelected.emit('shoppingList');  // emitting the event on button click
    }

}

