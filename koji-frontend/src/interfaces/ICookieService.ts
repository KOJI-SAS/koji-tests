export interface ICookieService {
    SetCookie(name : string, value : string) : void;
    GetCookie(name : string) : string;
    RemoveCookie(name: string) : void;
}