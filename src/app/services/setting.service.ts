import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {SettingHttpService} from "./setting.http.service";

@Injectable({providedIn: 'root'})
export class SettingService {

  allSettings$ = new BehaviorSubject<any>({});

  constructor(private settingHttpService: SettingHttpService) {
    this.loadAllSettings();
  }

  clearCache(): void {
    this.loadAllSettings();
  }

  private loadAllSettings(): void {
    this.settingHttpService.getAll().subscribe(result => {
      const settings: any = {};
      result.forEach(setting => {
        settings[setting.name] = setting.value;
      });
      this.allSettings$.next(settings);
    });
  }
}