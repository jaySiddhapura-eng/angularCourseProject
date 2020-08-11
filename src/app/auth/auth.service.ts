import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/Operators";
import { throwError, BehaviorSubject, Subject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { RecipeService } from "../recipes/recipe.service";
import {environment} from '../../environments/environment'
import { DataStorageService } from "../shared/data-storage.service";

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

    private signUpURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey;
    private loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey;

    user = new BehaviorSubject<User>(null);

    signInFlag = new Subject<boolean>();

    private tokenExpirationTimer: any;


    constructor(private http : HttpClient,
                private router : Router,
                private recSer : RecipeService){
    }

    signUp(email:string, password:string){
        return this.http.post<AuthResponseData>(this.signUpURL,
                {email:email, 
                password:password,
                returnSecureToken:true
                })
                .pipe(catchError(this.handleError)
                        ,tap(
                            resData => {
                                this.userAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                            }
                ));
    }

    login(email:string, password:string){   // only prepare the observable but no subscribe here
        

        return this.http.post<AuthResponseData>(this.loginURL,
                {email:email,
                password:password,
                returnSecureToken: true   
                })
                .pipe(catchError(this.handleError)
                            ,tap(
                                resData => {
                                    this.userAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                                }
                            ));

                            
    }

    autoLogin(){
        const userData:{
            email:string;
            id:string;
            _token:string;
            _tokenExpirationDate:string;
            } = JSON.parse(localStorage.getItem('userData'));

        if(!userData){
            return;
        } 

        const LoadedUser  = new User(userData.email, 
                                     userData.id, 
                                     userData._token, 
                                     new Date(userData._tokenExpirationDate)
         );

         if(LoadedUser.token){
           this.user.next(LoadedUser);  
           const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
           //this.autoLogout(expirationDuration);
         }
 
    }

    logout(){
        this.user.next(null);   // make the user object null
        this.router.navigate(['/auth']);

        // let userData = JSON.parse(localStorage.getItem('userData'));
        // let userId = userData.id;
        // console.log(userId);

        // let newLink = 'https://recipe-book-storage-c63c0.firebaseio.com/' + userId + '.json';

        // const recipes = this.recSer.getRecipe();
        // this.http.put(newLink, recipes).subscribe(
        //     response => {
        //         console.log(response);
        //     }
        // );
        
        // clear the user data locally stored
        localStorage.removeItem('userData');

        

        this.recSer.deleteAllRecipeLocal();

        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    // autoLogout(expirationDuration : number){
    //     this.tokenExpirationTimer = setTimeout(() =>{
    //         this.logout();

    //     },expirationDuration);
    // }




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

    private userAuthentication(email:string, userId:string, token: string, expiresIn: number){
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000);

        const user = new User(email, 
                              userId,
                              token,
                              expirationDate);

        this.user.next(user);
        //this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData', JSON.stringify(user));

    }



}