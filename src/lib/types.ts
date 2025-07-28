export declare interface UserI{
    _id?: string;
    name?: string;
    email: string;
    dateOfBirth?:string;
    gender?: string;
    password: string;
    photo?: string;
}
export declare interface PostI{
    _id: string;
    body: string;
    image: string;
    user: UserI;
    createdAt: string;
    comments: CommentI[];
}
export declare interface CommentI{
    _id: string;
    content: string;
    commentCreator: UserI;
    post: PostI;
    createdAt: string;
}
export declare interface CommentState{
    loading:boolean;
    content: string | null;
    post: string | null;
}
export type UserState = {
    loading:boolean;
    token: null | string;
    user: null| UserI;
    userPosts:PostI[] | null,
}
export type PostsState = {
    loading: boolean;
    posts: PostI[] | null;
}