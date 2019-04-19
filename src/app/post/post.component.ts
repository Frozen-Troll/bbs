import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PageEvent } from '@angular/material';

import { Post } from "../model/PostModel";
import { PostService } from "../post.service";
import { AppComponent } from "../app.component";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[];
  topposts: Post[];
  nowposts:Post[];
  post: Post;
  community: string;
  eventsource: EventSource;
  editMode: boolean;
  pageEvent:PageEvent;
  totalPost:number;
  nowPage:number;

  sourceNowPost:EventSource;

  constructor(
    private postService: PostService,
    private router: ActivatedRoute,
    private app: AppComponent,
  ) { }

  ngOnInit() {
    this.nowPage=0;
    this.editMode = false;
    this.community = this.router.snapshot.paramMap.get('community');
    this.posts = [];
    this.topposts = [];
    this.getSSEPosts();
    this.getSSETopPosts();
    this.getSSENowPosts(0);
    //this.getPosted();
    //this.getTopposts();
    //console.log("我出生了");
  }

  nextPage():void{
    this.nowPage++;
    this.sourceNowPost.close();
    this.getSSENowPosts(this.nowPage);
  }
  prePage():void{
    this.nowPage--;
    this.sourceNowPost.close();
    this.getSSENowPosts(this.nowPage);
  }

  changePage(event?:PageEvent):void{
    this.sourceNowPost.close();
    this.getSSENowPosts(event.pageIndex);
  }

    //从服务器接受SSE消息的某一页post
    getSSENowPosts(pagenum:number): void {
      this.sourceNowPost = new EventSource(`/posts?community=${this.community}&page=${pagenum}`);
      let post = new Post;
      let flag = true;
      this.sourceNowPost.addEventListener('message', response => {
        if (flag == true) {
          this.nowposts = [];
          flag = false;
        }
        post = JSON.parse((<MessageEvent>response).data);
        this.nowposts.push(post);
      });
      this.sourceNowPost.addEventListener('error', response => {
        if (response.eventPhase == this.sourceNowPost.CLOSED) {
          flag = true;
        }
      });
    }

  //从服务器接受SSE消息的post
  getSSEPosts(): void {
    let sourcePost = new EventSource(`/posts?community=${this.community}`);
    let post = new Post;
    let flag = true;
    sourcePost.addEventListener('message', response => {
      if (flag == true) {
        this.posts = [];
        flag = false;
      }
      post = JSON.parse((<MessageEvent>response).data);
      this.posts.push(post);
    });
    sourcePost.addEventListener('error', response => {
      if (response.eventPhase == sourcePost.CLOSED) {
        this.totalPost=this.posts.length;
        flag = true;
      }
    });
  }

  //从服务器接受SSE消息的toppost
  getSSETopPosts(): void {
    let sourceTopPost = new EventSource(`/posts/top?community=${this.community}`);
    let toppost = new Post;
    let flag = true;
    sourceTopPost.addEventListener('message', response => {
      if (flag == true) {
        this.topposts = [];
        flag = false;
      }
      toppost = JSON.parse((<MessageEvent>response).data);
      this.topposts.push(toppost);
    });
    sourceTopPost.addEventListener('error', response => {
      if (response.eventPhase == sourceTopPost.CLOSED) {
        flag = true;
      }
    });
  }

  topThePost(post:Post){
    this.postService.setTopPost(post).subscribe(()=> alert("置顶成功"));
  }


  //http请求当前板块内所有帖子    //暂时不用
  getPosted(): void {
    this.postService.getPosts(this.community).subscribe(posts => this.posts = posts);
  }
  //http请求当前板块内置顶帖子    //暂时不用
  getTopposts(): void {
    this.postService.getTopposts(this.community).subscribe(posts => this.topposts = posts);
  }

  //http删帖
  deletePost(post: Post): void {
    this.postService.deletePost(post).subscribe(() => {
      alert("删帖成功");
      this.posts = this.posts.filter(p => p.id !== post.id);
    });
  }

  //http发帖
  pullPost(title: string, content: string): void {
    title = title.trim();
    content = content.trim();
    const community = this.community;
    if (!title) { return; }
    this.postService.addPost({ title, content, community } as Post).subscribe(post => { this.posts.push(post) });
    alert("发帖成功 ");
  }

  //开关编辑模式
  startEditMode(): void {
    if (this.editMode)
      this.editMode = false;
    else
      this.editMode = true;
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    if (role == "ROLE_ADMIN")
      return true;
    else
      return false;
  }

}