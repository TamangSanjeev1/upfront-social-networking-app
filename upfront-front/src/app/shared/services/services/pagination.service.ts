import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {PagedResponse, Post} from "../../models/user-profile.model";
import {Apiconstants} from "../../apiconstants";
import {BaseService} from "../base-service/base.service";

@Injectable({
  providedIn: 'root'
})
export class PaginationService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  getByPagination(page: number, size: number = 10, url: string, user: any = null): Observable<PagedResponse<any>> {
    let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());

    if (user != null) {
      params = params.set('user', user);
    }
    return this.http.get<PagedResponse<any>>(environment.apiUrl + url + Apiconstants.PAGINATION, { params });
  }

  getPostsByTag(tag: string, page: number, size: number = 10, user: any = null): Observable<PagedResponse<Post>> {
    let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());

    if (user != null) {
      params = params.set('user', user);
    }
    return this.http.get<PagedResponse<Post>>(environment.apiUrl + Apiconstants.POST + Apiconstants.TAG + `${tag}`, { params });
  }
}
