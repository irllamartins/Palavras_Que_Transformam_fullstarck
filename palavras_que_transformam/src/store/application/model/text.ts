export enum TextType {
    COMMON = "common",
    CHALLENGE = "challenge"
}

export interface NewText  {
    user_id: string,
    title: string ,
    body: string ,
    number_words: number 
}
export interface Text  {
    id: string 
    user_id: string,
    title: string ,
    body: string ,
    created_at?: string,
    update_at?: string ,
    achieved_goal?: boolean,
    number_words: number 
}