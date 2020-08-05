import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/Operators";
import { throwError } from "rxjs";

export interface AuthResponseData {
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
    registered? : Boolean
}

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    private signUpURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRJOyGKwNuEMzGq0O4q9gG4K0sGG6MqlY';
    private loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRJOyGKwNuEMzGq0O4q9gG4K0sGG6MqlY';

    constructor(private http : HttpClient){

    }

    signUp(email:string, password:string){
        return this.http.post<AuthResponseData>(this.signUpURL,
                {email:email, 
                password:password,
                returnSecureToken:true
                })
                .pipe(catchError(this.handleError));
    }

    login(email:string, password:string){   // only prepare the observable but no subscribe here
        return this.http.post<AuthResponseData>(this.loginURL,
                {email:email,
                password:password,
                returnSecureToken: true   
                })
                .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse : HttpErrorResponse){
        let errorMessage = 'An unknown error occured';
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(errorMessage);
        }

        switch (errorResponse.error.error.message){
            // sign up related errors
            case 'EMAIL_EXISTS': 
                errorMessage = 'This email exists already';
                break;

            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Too many attempts try again later';
                break;

            // sign in related errors   
            
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid Password';
                break;

            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not found';
                break;

            // case 'INVALID_PASSWORD':
            //     errorMessage = 'Wrong Password';    
        }
        return throwError(errorMessage);
    }

}