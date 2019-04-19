import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Post } from "../model/PostModel";
import { PostService } from "../post.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})

export class PostDetailComponent implements OnInit {

  post: Post;
  tempPosts:Post[];
  responsePosts: Post[];
  parentId: string;
  community: string;
  resMode: boolean;
  editedPost: Post;
  content: string;

  constructor(
    private postService: PostService,
    private router: ActivatedRoute,
    private location: Location,
    private app: AppComponent
    //不要妄图添加PostComponent了，用不了的
  ) { }

  ngOnInit() {
    this.resMode = false;
    this.content = "";
    this.responsePosts = [];
    this.parentId = this.router.snapshot.paramMap.get('id');
    this.community = this.router.snapshot.paramMap.get('community');
    this.getSSEResponsePosts();
    this.getSSEPMainosts();
  }

  //从服务器接受SSE消息的所有回帖
  getSSEResponsePosts(): void {
    let sourceResponsePost = new EventSource(`/posts/${this.parentId}`);
    let post = new Post;
    let flag=true;
    sourceResponsePost.addEventListener('message', response => {
      if (flag == true) {
        this.responsePosts = [];
        flag = false;
      }
      post = JSON.parse((<MessageEvent>response).data);
      this.responsePosts.push(post);
    });
    sourceResponsePost.addEventListener('error', response => {
      if (response.eventPhase == sourceResponsePost.CLOSED) {
        flag = true;
      }
    });
  }
  getSSEPMainosts(): void {
    let findPost = new EventSource(`/posts?community=${this.community}`);
    let post = new Post;
    findPost.addEventListener('message', response => {
      post = JSON.parse((<MessageEvent>response).data);
      if(post.id==this.parentId){
        this.post=post;
        findPost.close();
      }
    });
  }

  //http请求当前的第一个帖子
  getPost(): void {
    this.postService.getPosts(this.parentId).subscribe(post => this.post = post.find(post => post.id == this.parentId));
  }

  //http请求当前第一个帖子的所有回帖
  getResponse(): void {
    this.postService.getResPosts(this.parentId).subscribe(posts => this.responsePosts = posts);
    console.log("我请求了，鬼知道有没有拿到");
  }

  //http回帖
  commit(content: string): void {
    content = content.trim();
    const parentId = this.parentId;
    const community = this.community;
    this.postService.replyPost({ content, parentId, community } as Post).subscribe(post => {
      this.responsePosts.push(post);
      alert("回帖成功 ");
    });
  }

  //http修改帖子
  edit(content: string): void {
    this.editedPost.content = content.trim();
    this.postService.editPost(this.editedPost).subscribe(() => {
      alert("修改成功");
      this.resMode = false;
      this.content = null;
    });
  }

  //修改回复帖内容
  startEditMode(posts: Post): void {
    this.editedPost = posts;
    this.content = posts.content;
    this.resMode = true;
  }

  IsAuthor(post:Post):void{

  }
  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    if (role == "ROLE_ADMIN")
      return true;
    else
      return false;
  }

  //返回上一菜单
  goBack(): void {
    this.location.back();
  }

}