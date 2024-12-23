import { ApplyType } from './apply';
import { ProgramType } from './program';

export type GroupType = {
    id: number;
    name: string;
    auth_id: string;
    email: string;
    type: string;
    insta?: string;
    x?: string;
    tiktok?: string;
    hp?: string;
    apply?: ApplyType[];
    program?: ProgramType[];
}