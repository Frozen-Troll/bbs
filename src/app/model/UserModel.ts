export class User{
    private _username:string;
    private _password:string;
    public signature:string;
    public enable:boolean;
    public roles:string[];

    public get username():string{
        return this._username;
    }

    public set username(value: string){
        this._username=value;
    }

    public get password():string{
        return this._password;
    }

    public set password(value: string){
        this._password=value;
    }
}