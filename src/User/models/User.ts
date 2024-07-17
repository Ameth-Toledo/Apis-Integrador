export interface  User{
    user_id : number | null;
    name : string;
    role_name:string;
    second_name : string;
    last_name_paternal: string;
    last_name_maternal: string;
    email : string;
    password : string;
    role_id : string; 
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}