import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Apiconstants} from "../../apiconstants";
import {BaseService} from "../base-service/base.service";
import {UserProfile} from "../../../core/models/common-model";
import {AuthService} from "../../../core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  viewUser = signal<UserProfile | null>(null);
  authService: AuthService = inject(AuthService);
  constructor(http: HttpClient) {
    super(http);
  }

  viewUserDetails(id: any) {
    if (id && this.authService.currentUser()!.id != id) {
      super.getById(Apiconstants.USER, id).subscribe({
        next: user => this.viewUser.set(user),
        error: err => console.log(err)
      });
    }
  }
}
