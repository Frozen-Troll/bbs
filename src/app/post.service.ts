import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Post } from "./model/PostModel";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Authorzation':'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'api/posts';

  constructor(
    private http:HttpClient
  ) { }

  getPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPostDetail(id:string):Observable<Post>{
    const url=`${this.postsUrl}/${id}`;
    return this.http.get<Post>(url);
  }
  getPostDetialResponse(parentId: string):Observable<Post[]>{
    const url=`${this.postsUrl}/${parentId}`;
    return this.http.get<Post[]>(url);
  }

  addPost(post:Post):Observable<Post>{
    return this.http.post<Post>(this.postsUrl,post,httpOptions);
  }

}
