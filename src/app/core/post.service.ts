import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Post } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  searchPosts(searchQuery: string): Observable<any[]> {
    const url = '/api/post/search';

    if (searchQuery.length) {
      return this.http.get<any[]>(url, {
        params: new HttpParams().set('searchQuery', searchQuery),
      });
    } else {
      this.getPosts((0).toString());
    }
  }

  getPosts(offset?): Observable<Post[]> {
    const url = '/api/post/list';

    return this.http.get<any[]>(url, {
      params: new HttpParams().set('offset', offset),
    });
  }

  getPost(id: number): Observable<Post> {
    const url = '/api/post/single';

    return this.http.get<Post>(url, {
      params: new HttpParams().set('id', id.toString()),
    });
  }

  deletePost(id: number): Observable<any> {
    const url = '/api/post/delete/' + id;

    return this.http.post<any>(url, {});
  }

  toggleFavorite(id: number): Observable<any> {
    const url = '/api/post/favorite';

    return this.http.post<any>(
      url,
      {},
      { params: new HttpParams().set('postId', id.toString()) }
    );
  }
}
