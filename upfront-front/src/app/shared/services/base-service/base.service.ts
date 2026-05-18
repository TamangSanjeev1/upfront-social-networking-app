import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {
  }

  postRequest(model: any, url: string) {
    return this.http.post<any>(environment.apiUrl + url, model).pipe(
      tap(_ => this.log(_)),
      catchError(err => {
        this.handleError(err);
        throw err;
      })
    );
  }

  /** GET request from the server */
  getRequest(url: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl  + url)
      .pipe(
        tap(result => this.log(result)),
        catchError(err => {
          this.handleError(err);
          throw err;
        })
      );
  }

  /** GET request list from the server */
  getRequestList(url: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl  + url)
      .pipe(
        tap(result => this.log(result)),
        catchError(err => {
          this.handleError(err);
          throw err;
        })
      );
  }


  /** GET by id. Will 404 if id not found */
  getById(url: string, id: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + url, {
      params: {
        id: id
      }
    }).pipe(
      tap(_ => this.log(_)),
      catchError(err => {
        this.handleError(err);
        throw err;
      })
    );
  }

  getAllById(url: string, id: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + url, {
      params: {
        id: id
      }
    }).pipe(
      tap(_ => this.log(_)),
      catchError(err => {
        this.handleError(err);
        throw err;
      })
    );
  }

  /** PUT: update the on the server */
  updateRequest(data: any, url: string): Observable<any> {
    return this.http.put(environment.apiUrl + url, data).pipe(
      tap(_ => this.log(`updated id=${data}`)),
      catchError(err => {
        this.handleError(err);
        throw err;
      })
    );
  }

  /** DELETE: delete the data from the server */
  deleteRequest(url: string, id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + url + id)
      .pipe(
        catchError(err => {
          this.handleError(err);
          throw err;
        })
      );
  }

  /* search functionality */
  searchRequest(url: string, term: string): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http.get<{}>(environment.apiUrl + url + term).pipe(
      tap(_ => this.log(`found data "${term}"`)),
      catchError(err => {
        this.handleError(err);
        throw err;
      })
    );
  }

  uploadFile(formData: FormData, url: string) {
    return this.http.post<any>(environment.apiUrl + url, formData,{
      reportProgress: true,
      observe: 'events'
    });
  }

  formRequest(formData: FormData, url: string) {
    return this.http.post<any>(environment.apiUrl + url, formData);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError(result: any) {
    if (result instanceof HttpErrorResponse) {
      if (result.status == 401) {

      }
    }
    return (error: any): Observable<any> => {

      this.log(error);

      return of(result);
    };
  }

  /** Log a  message with the MessageService */
  public log(message: any) {
    console.log(message);
  }

  private httpError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      return throwError(() => new Error(error.error));
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
