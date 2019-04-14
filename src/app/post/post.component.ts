import { Component, OnInit } from '@angular/core';

import { Post } from "../model/PostModel";
import { PostService } from "../post.service";
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[];
  initTime: string[];
  now: Date;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getPosted();
    //this.now=new Date;
    //console.log(this.now.getMonth());
    console.log("我出生了");
    /*
    this.posts.sort(
      function(obj1,obj2):number{
        return obj1.lastUpdateTime-obj2.lastUpdateTime;
    });*/
    //this.posts.filter(post =>post.parentId!=null);
  }


  getPosted(): void {
    this.postService.getPosts().subscribe(posts => this.posts = posts.filter(post => post.parentId == null));
    console.log();
  }

  pullPost(title: string, content: string, initTime: string): void {
    title = title.trim();
    content = content.trim();
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
    if (!title) { return; }
    this.postService.addPost({ title, content, initTime } as Post).subscribe(post => { this.posts.push(post) });
    alert("发帖成功 ");
  }

}