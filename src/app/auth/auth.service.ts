import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface AuthResponseData {
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    private signUpURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRJOyGKwNuEMzGq0O4q9gG4K0sGG6MqlY';

    constructor(private http : HttpClient){

    }

    signUp(email:string, password:string){
        return this.http.post<AuthResponseData>(this.signUpURL,
                {email:email, 
                password:password,
                returnSecureToken:true
                })
    }

}