import { Component, OnInit, Input } from '@angular/core';
import { Location } from "@angular/common";

import { Post } from "../model/PostModel";
import { PostService } from "../post.service";
import { PostComponent } from "../post/post.component";

@Component({
  selector: 'app-pull-post',
  templateUrl: './pull-post.component.html',
  styleUrls: ['./pull-post.component.css']
})
export class PullPostComponent implements OnInit {

  private now:Date;

  constructor(
    private postService:PostService,
    private location: Location
    ) { }

  ngOnInit() {
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
    this.postService.addPost({ title, content, initTime } as Post).subscribe(post => {console.log(post.id)});
    alert("发帖成功 ");
    this.goBack();
  }

  goBack():void{
    this.location.back();
  }

}
