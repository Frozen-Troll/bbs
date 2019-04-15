import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Post } from "../model/PostModel";
import { PostService } from "../post.service";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[];
  topposts:Post[];
  community:string;

  constructor(
    private postService: PostService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.community = this.router.snapshot.paramMap.get('community');
    this.getPosted();
    this.getTopposts();
    //this.now=new Date;
    //console.log(this.now.getMonth());
    console.log("我出生了");
  }

  //请求当前板块内所有帖子
  getPosted(): void {
    this.postService.getPosts(this.community).subscribe(posts => this.posts = posts);
  }
  //请求当前板块内置顶帖子
  getTopposts():void{
    this.postService.getTopposts(this.community).subscribe(posts => this.topposts = posts);
  }

  
  //发帖
  pullPost(title: string, content: string): void {
    title = title.trim();
    content = content.trim();
    const community=this.community;
    if (!title) { return; }
    this.postService.addPost({ title, content, community } as Post).subscribe(post => { this.posts.push(post) });
    alert("发帖成功 ");
  }

}