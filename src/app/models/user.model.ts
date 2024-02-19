
export interface UserDetails {
    data: User[]
    total: number
    page: number
    last_page: number
}
export interface User{
    _id: string,
    username: string,
    role:string,
    displayName: string,
    tache: any[]
}
