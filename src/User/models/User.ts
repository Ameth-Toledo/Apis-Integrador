export interface  User{
    user_id : number | null;
    name : string;
    last_name: string;
    email : string;
    password : string;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}