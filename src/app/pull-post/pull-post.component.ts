import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Post } from "../model/PostModel";
import { PostService } from "../post.service";

@Component({
  selector: 'app-pull-post',
  templateUrl: './pull-post.component.html',
  styleUrls: ['./pull-post.component.css']
})
export class PullPostComponent implements OnInit {

  community:string;

  constructor(
    private postService:PostService,
    private location: Location,
    private router: ActivatedRoute
    ) { }

  ngOnInit() {
    this.community = this.router.snapshot.paramMap.get('community');
    //this.community=this.postComponent.community;
    console.log(this.community);
  }


  pullPost(title: string, content: string): void {
    title = title.trim();
    content = content.trim();
    const community=this.community;
    if (!title) { return; }
    this.postService.addPost({ title, content, community } as Post).subscribe(() => {this.location.back() });
    alert("发帖成功 ");
    this.goBack();  
  }

  goBack():void{
    this.location.back();
  }

}
