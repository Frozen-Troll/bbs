export class Post{
    public id: string;
    public title: string;
    public author: string;
    public content: string;
    public parentId: string;
    public community: string;
    public upvote: number;
    public visibility: boolean;
    public deleted: boolean;
    public initTime: string;
    public lastUpdateTime: Date;
/*
    public get id():string{
        return this.id;
    }
    public set id(value: string){
        this.id=value;
    }

    public get title():string{
        return this.title;
    }
    public set title(value: string){
        this.title=value;
    }

    public get author():string{
        return this.author;
    }
    public set author(value: string){
        this.author=value;
    }

    public get content():string{
        return this.content;
    }
    public set content(value: string){
        this.content=value;
    }

    public get community():string{
        return this.community;
    }
    public set community(value: string){
        this.community=value;
    }

    public get upvote():number{
        return this.upvote;
    }
    public set upvote(value: number){
        this.upvote=value;
    }

    public get visibility(): boolean{
        return this.visibility;
    }
    public set visibility(value: boolean){
        this.visibility=value;
    }

    public get deleted(): boolean{
        return this.deleted;
    }
    public set deleted(value: boolean){
        this.deleted=value;
    }

    public get initTime(): Date{
        return this.initTime;
    }
    public set initTime(value: Date){
        this.initTime=value;
    }

    public get lastUpdateTime():Date{
        return this.lastUpdateTime;
    }
    public set lastUpdateTime(value: Date){
        this.lastUpdateTime=value;
    }
*/
}