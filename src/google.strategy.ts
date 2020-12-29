import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { Verify } from "crypto";

Injectable()

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '975440673856-kqbv8huat27oocc2valc2rqmt8m3qkdo.apps.googleusercontent.com',
            clientSecret: 'lOlgMMRaVjYOcMPzB7ugG8Cx',
            callbackURL: 'http://localhost:5000/auth/google/callback',
            scope: ['email','profile']
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any,
         done: VerifyCallback): Promise<any> {
            const{name,emails,photos} = profile
            const user = {
                email: emails[0].value,
                firstName: name.givenName,
                lastName: name.familyName,
                picture: photos[0].value,
                accessToken,
            }
            done(null,user)
    }
}