import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Post } from "../model/PostModel";
import { PostService } from "../post.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-pull-post',
  templateUrl: './pull-post.component.html',
  styleUrls: ['./pull-post.component.css']
})
export class PullPostComponent implements OnInit {

  community: string;

  constructor(
    private postService: PostService,
    private location: Location,
    private router: ActivatedRoute,
    private app:AppComponent
  ) { }

  ngOnInit() {
    this.community = this.router.snapshot.paramMap.get('community');
    //this.community=this.postComponent.community;
    console.log(this.community);
  }


  //http发帖
  pullPost(title: string, content: string): void {
    title = title.trim();
    content = content.trim();
    const community = this.community;
    const author =this.app.user.username;
    if (!title) { return; }
    this.postService.addPost({ title, content, community, author } as Post).subscribe(() => {
      this.location.back();
      alert("发帖成功 ");
    });
  }

  goBack(): void {
    this.location.back();
  }

}
