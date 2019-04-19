import { Component, OnInit } from '@angular/core';

import { Post } from "../model/PostModel";
import { PostService } from "../post.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  hotPosts:Post[];

  constructor(
    private postService:PostService
  ) { }

  ngOnInit() {
    this.getHotPost();
  }

  getHotPost():void{
    this.postService.getHotPost().subscribe(post =>this.hotPosts=post);
  }

}
