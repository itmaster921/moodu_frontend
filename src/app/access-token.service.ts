import {Injectable} from '@angular/core';

@Injectable()
export class AccessTokenService {
    session: any;

    constructor(){
    }

    getAccessToken(): string{
        if(this.session){
            if(this.session.accessToken){
                return this.session.accessToken;
            } else {
                return this.session.access_token;
            }
        }
        return null;
        
    }

    clearAccessToken(): void{
        this.session = null;
    }

    setSession(session: any){
        this.session = session;
    }

    getSession(){
        return this.session;
    }

}