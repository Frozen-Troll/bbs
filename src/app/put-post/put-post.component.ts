import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Post } from "../model/PostModel";
import { PostService } from "../post.service";

@Component({
  selector: 'app-put-post',
  templateUrl: './put-post.component.html',
  styleUrls: ['./put-post.component.css']
})
export class PutPostComponent implements OnInit {

  post: Post;
  tempPosts: Post[];

  constructor(
    private postService: PostService,
    private location: Location,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.post.id = this.router.snapshot.paramMap.get('id');
    this.post.community = this.router.snapshot.paramMap.get('community');
    this.getSSEPosts();
  }
  //从服务器接受SSE消息的post
  getSSEPosts(): void {
    let sourcePost = new EventSource(`/posts?community=${this.post.community}`);
    let post = new Post;
    let flag = true;
    sourcePost.addEventListener('message', response => {
      if (flag == true) {
        this.tempPosts = [];
        flag = false;
      }
      post = JSON.parse((<MessageEvent>response).data);
      this.tempPosts.push(post);
    });
    sourcePost.addEventListener('error', response => {
      if (response.eventPhase == sourcePost.CLOSED) {
        flag = true;
        sourcePost.close();
        this.post = this.tempPosts.find((post) => post.id == this.post.id);
      }
    });
  }

  //修改主题帖
  putPost(title: string, content: string): void {
    this.post.title = title.trim();
    this.post.content = content.trim();
    if (!title) { return; }
    this.postService.editPost(this.post).subscribe(() => {
      alert("修改成功");
      this.goBack();
    });
  }


  goBack(): void {
    this.location.back();
  }
}
