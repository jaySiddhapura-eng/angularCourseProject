import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";




@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent{

    constructor(private authSer:AuthService){}

    // flag to show whether user is in  signup mode or login mode
    isLoginMode = true;

    // this method changes the mode by simple making the isLoginMode property opposite
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){

        const email = form.value.email;
        const password = form.value.password;

        if (this.isLoginMode) {
            // signin logic
        } else {
            // sign up logic
            this.authSer.signUp(email, password).subscribe(
                responseData => {
                    console.log(responseData);
                },
                error => {
                    console.log(error);
                }
            );
        }

        form.reset();
    }

}