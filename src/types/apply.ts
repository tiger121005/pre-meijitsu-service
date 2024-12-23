import { GroupType } from './group';

export type ApplyType = {
    id: number;
    title: string;
    detail: string;
    type: string;
    detailType: string;
    time: number | null;
    collaboration: string | null;
    groupId: number;
    group?: GroupType;
    priority: boolean;
    newProject: boolean;
}