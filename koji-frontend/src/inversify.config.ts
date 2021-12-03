import { Container} from "inversify";
import getDecorators from "inversify-inject-decorators";
import IGeoApiService from "./interfaces/IGeoApiService";
import {TYPES} from "./const/TYPES";
import {GeoApiService} from "./services/GeoApiService";
import {IConfigService} from "./interfaces/IConfigService";
import {ConfigService} from "./services/ConfigService";
import {IBackEndService} from "./interfaces/IBackEndService";
import {BackEndService} from "./services/BackEndService";
import {ICookieService} from "./interfaces/ICookieService";
import {CookieService} from "./services/CookieService";

const container: Container = new Container();
container.bind<IGeoApiService>(TYPES.IGeoApiService).to(GeoApiService);
container.bind<IConfigService>(TYPES.IConfigService).to(ConfigService);
container.bind<IBackEndService>(TYPES.IBackEndService).to(BackEndService);
container.bind<ICookieService>(TYPES.ICookieService).to(CookieService);


export const { lazyInject } = getDecorators(container, false);
export {container};
