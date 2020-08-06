import {Component, OnInit, OnDestroy} from '@angular/core'
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrls: ['./header.component.css']
}
)
export class HeaderComponent implements OnInit, OnDestroy{

    private userSub : Subscription;

    isAuthenticated = false;

    constructor(private remote:DataStorageService, 
                private authService : AuthService){
    }

    

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(
            user => {
                this.isAuthenticated = !user ? false :true;
            }
        );
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

    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}

