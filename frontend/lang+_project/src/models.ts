export interface IActivity {
    id: number;
    title: string;
    startAt: string;
    endAt: string;
    timetableId: number;
}

export interface ITimetable {
    id: number;
    date: string;
}