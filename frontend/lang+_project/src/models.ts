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
        backgroundColor: string;
    };
}

export interface ISportsTournament {
    id: number;
    title: string;
}

export interface ISportsEvent {
    teamOneName: string;
    teamTwoName: string;
    teamOnePoints: number;
    teamTwoPoints: number;
    date: string;
    sportTitle: string;
}

export interface ITeam {
    title: string;
}

export interface ITeamSportsScore {
    wins: number;
    draws: number;
    losses: number;
    points: number;
}

export interface IGrid {
    teams: ITeam[];
    events: ISportsEvent[][];
    scores: ITeamSportsScore[];
}

export interface IChild {
    id: number;
    name: string;
    surname: string;
    patronymic: string;
    age: number;
    teamRole: string;
}

export interface IPoints {
    points: number;
    team: string;
}