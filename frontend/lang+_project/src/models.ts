import { Moment } from "moment";

export interface IActivity {
    id: number;
    title: string;
    description: string;
    startAt: string;
    endAt: string;
    timetableId: number;
}

export interface ITimetable {
    id: number;
    date: string;
}

export interface IActivityToAdd {
    title: string;
    description: string;
    startAt: Moment | null;
    endAt: Moment | null;
    timetableId: number;
}