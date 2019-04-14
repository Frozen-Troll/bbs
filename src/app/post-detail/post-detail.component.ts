import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Post } from "../model/PostModel";
import { PostService } from "../post.service";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})

export class PostDetailComponent implements OnInit {

  post: Post;
  responsePosts:Post[];
  now:Date;

  constructor(
    private postService: PostService,
    private router: ActivatedRoute,
    private location:Location
  ) { }

  ngOnInit() {
    this.getPost();
    this.getResponse();
  }

  getPost(): void {
    const id = this.router.snapshot.paramMap.get('id');
    this.postService.getPostDetail(id).subscribe(post => this.post = post);
  }

  getResponse():void{
    const id = this.router.snapshot.paramMap.get('id');
    this.postService.getPosts().subscribe(posts => this.responsePosts = posts.filter(post =>post.parentId==id));
    //this.postService.getPostDetialResponse(id).subscribe(posts => this.responsePosts = posts);
    console.log("我请求了，鬼知道有没有拿到");
  }

  commit(content:string,initTime:string):void{
    content=content.trim();
    const parentId = this.router.snapshot.paramMap.get('id');
    this.now = new Date();
    initTime = this.now.getFullYear() + "-";
    if (this.now.getMonth() < 10)
      initTime += "0" + (this.now.getMonth() + 1) + "-";
    else
      initTime += (this.now.getMonth() + 1) + "-";
    if (this.now.getDate() < 10)
      initTime += "0" + this.now.getDate();
    else
      initTime += this.now.getDate();
    this.postService.addPost({content, initTime,parentId } as Post).subscribe(post => this.responsePosts.push(post));
    alert("回帖成功 ");
  }

  goBack():void{
    this.location.back();
  }

}