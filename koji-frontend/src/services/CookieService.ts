import {ICookieService} from "../interfaces/ICookieService";
import {injectable} from "inversify";
import Cookies from "js-cookie";

@injectable()
export class CookieService implements ICookieService{
    GetCookie(name: string): string {
        return Cookies.get(name) as string;
    }

    SetCookie(name: string, value: string): void {
        Cookies.set(name, value);
    }

    RemoveCookie(name: string): void {
        Cookies.remove(name);
    }

}