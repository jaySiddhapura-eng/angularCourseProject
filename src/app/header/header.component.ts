import {Component} from '@angular/core'
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrls: ['./header.component.css']
}
)
export class HeaderComponent{

    constructor(private remote:DataStorageService){

    }

    saveData(){
        //this.remote.storeRecipes();
        //console.log('save data clicked');
        this.remote.storeRecipes();
    }

    fetchData(){
        //console.log('fetch data clicked');
        this.remote.fetchRecipes().subscribe(); 
    }
}

