import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from "rxjs";




@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent{
    

    constructor(private authSer:AuthService, ){}

    // flag to show whether user is in  signup mode or login mode
    isLoginMode = true;

    // following property will decide whether we need the loading spinner or not
    isLoading = false;

    // following proerty will store the error which can occures during request
    error : string = null;

    // this method changes the mode by simple making the isLoginMode property opposite
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){

        const email = form.value.email;
        const password = form.value.password;

        // following variable will hold the observable
        let authObservable : Observable<AuthResponseData>;

        this.isLoading = true;

        if (this.isLoginMode) {
            // signin logic
            authObservable = this.authSer.login(email, password);
            this.error = null;
        } else {
            // sign up logic
            authObservable = this.authSer.signUp(email, password);
            this.error = null;
        }

        authObservable.subscribe(
            responseData => {
                console.log(responseData);
                this.isLoading = false;
            },
            errorMessage => {
                this.error = errorMessage;
                console.log(errorMessage);
                this.isLoading = false;
            }
        );

        form.reset();
    }

}