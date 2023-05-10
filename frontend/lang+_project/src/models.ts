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
}

export interface ILogin {
    login: string;
    password: string;
}

export interface IRegister {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
}

export interface IUserInfo {
    name: string;
    surname: string;
    username: string;
    email: string;
}

export interface IModal {
    text: string;
    style: {
        border: string;
    };
}