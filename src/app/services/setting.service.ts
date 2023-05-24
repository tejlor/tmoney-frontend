import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {SettingHttpService} from "./setting.http.service";

@Injectable({providedIn: 'root'})
export class SettingService {

  settings$ = new BehaviorSubject<any>({});

  constructor(private settingHttpService: SettingHttpService) {
    this.loadAll();
  }

  private loadAll(): void {
    this.settingHttpService.getAll().subscribe(result => {
      const settings: any = {};
      result.forEach(setting => {
        settings[setting.name] = setting.value;
      });
      this.settings$.next(settings);
    });
  }
}