import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TransferRequest} from "../model/transferRequest";
import {HttpService} from "./http.service";

@Injectable({providedIn: 'root'})
export class TransferHttpService extends HttpService {

  private readonly baseUrl = 'transfers';


  createTransfer(transfer: TransferRequest): Observable<void> {
    return this.post(`${this.baseUrl}`, transfer);
  }

}