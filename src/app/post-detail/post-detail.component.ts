import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Post } from "../model/PostModel";
import { PostService } from "../post.service";
import { PostComponent } from "../post/post.component";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})

export class PostDetailComponent implements OnInit {

  post: Post;
  responsePosts: Post[];
  parentId: string;
  community: string;

  constructor(
    private postService: PostService,
    private router: ActivatedRoute,
    private location: Location,
    //private postComponent:PostComponent
  ) { }

  ngOnInit() {
    this.parentId = this.router.snapshot.paramMap.get('id');
    this.getPost();
    this.getResponse();
    this.community = this.router.snapshot.paramMap.get('community');
    console.log(this.community);
  }

  //请求当前的第一个帖子
  getPost(): void {
    this.postService.getPosts(this.parentId).subscribe(post => this.post = post.find(post => post.id == this.parentId));
  }

  //请求当前第一个帖子的所有回帖
  getResponse(): void {
    this.postService.getResPosts(this.parentId).subscribe(posts => this.responsePosts = posts);
    console.log("我请求了，鬼知道有没有拿到");
  }

  //回帖
  commit(content: string): void {
    content = content.trim();
    const parentId = this.parentId;
    const community =this.community;
    this.postService.addPost({ content, parentId, community } as Post).subscribe(post => this.responsePosts.push(post));
    alert("回帖成功 ");
  }

  goBack(): void {
    this.location.back();
  }

}