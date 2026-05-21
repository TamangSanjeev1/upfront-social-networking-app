import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {PagedResponse, Post} from "../../models/user-profile.model";
import {Apiconstants} from "../../apiconstants";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  getPosts(page: number, size: number = 10): Observable<PagedResponse<Post>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PagedResponse<Post>>(environment.apiUrl + Apiconstants.POST + Apiconstants.PAGINATION, { params });
  }

  getPostsByTag(tag: string, page: number, size: number = 10): Observable<PagedResponse<Post>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PagedResponse<Post>>(environment.apiUrl + Apiconstants.POST + Apiconstants.TAG + `${tag}`, { params });
  }
}
