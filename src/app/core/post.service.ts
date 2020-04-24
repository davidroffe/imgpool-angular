import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Post } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  searchPosts(searchQuery: string): Observable<any[]> {
    const url = '/api/post/search';

    if (searchQuery.length) {
      return this.http.get<Post[]>(url, {
        params: new HttpParams().set('searchQuery', searchQuery),
      });
    } else {
      return this.getPosts((0).toString());
    }
  }

  getPosts(offset?): Observable<Post[]> {
    const url = '/api/post/list';

    return this.http.get<Post[]>(url, {
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

  createPost(
    formData: FormData,
    params: { source: string; tags: string }
  ): Observable<any> {
    const url = '/api/post/create';

    return this.http.post<any>(url, formData, {
      params: new HttpParams()
        .set('source', params.source)
        .set('tags', params.tags),
    });
  }
}
