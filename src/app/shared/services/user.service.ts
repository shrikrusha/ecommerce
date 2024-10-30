import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user_url = 'http://localhost:3000/user';
  constructor(private apiService: ApiService) { }

  singleUser(user_id:any): Observable<any> {
    return this.apiService.get(`${this.user_url}?id=${user_id}`);
  }
  editUser(user_id:any,user_dto: any){
    return this.apiService.put(`${this.user_url}/${user_id}`, user_dto);
  }
}
