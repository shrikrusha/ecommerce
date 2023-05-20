export interface SignUp{
    name :string,
    email:string,
    password:string
}
export interface login{
    email:string,
    password:string
}

export interface product{
    id:number;
    name:string;
    price:string;
    category:string;
    color:string;
    description:string;
    image:string;
}