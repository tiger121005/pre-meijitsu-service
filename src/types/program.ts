import { GroupType } from "./group";

export type ProgramType = {
    id: number;
    type: string;
    title: string;
    catch: string;
    detail: string;
    genre: string;
    place: string;
    room: string;
    date: string;
    status: string;
    keyword: string;
    group?: GroupType;
    authorId: number;
}