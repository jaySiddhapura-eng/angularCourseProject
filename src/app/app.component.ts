import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedFeaturePage : string = 'recipes';

  onNavigate(feature:string){
    this.selectedFeaturePage = feature; // the input parameter is assigned to the local variable
  }

}
