import { Injectable } from '@angular/core';

import { InMemoryDbService } from "angular-in-memory-web-api";
import { Post } from "./model/PostModel";
import { Community } from "./model/CommunityModel";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  //date1:Date;
  createDb(){
    /*
    this.date1=new Date();
    this.date1.setDate(19);
    this.date1.setFullYear(2019);
    this.date1.setMonth(3);
    */
    const posts =[
      {id: 1,title:'特大消息，特大消息！！！',author:'gty',initTime:'2019-03-19',content:"最近A市发生特大地震"},
      {id: 2,title:'第二个帖子',author:'yym', initTime:'2019-03-20',content:"我是正文"},
      {id: 3,author:'yym',initTime:'2019-04-11',content:"那我们要当心哦",parentId:1},
      {id: 4,author:'犹豫，就会败北',initTime:'2019-04-12',content:"什么？我就在A市我怎么不知道",parentId:1}
    ];
    const communities =[
      {name:"java",id:"123123"},
      {name:"js",id:"12331243"},
      {name:"ts",id:"12331"},
      {name:"C",id:"123313"},
      {name:"C++",id:"121243"},
      {name:"C#",id:"1233"}
    ];
    return {communities};
  }
  
  constructor() { }
}
