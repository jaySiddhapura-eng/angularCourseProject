import {Ingredient} from '../shared/ingredient.model';

export class Recipe{

    // instance varibles
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients:Ingredient[];

    // whenever the object from this class created 
    // an instance variable assignnment need to be done
    constructor(name:string,description:string,imagePath:string, ingredient:Ingredient[]){
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredient;
    }
}