export interface IActivity {
    activityId: number;
    title: string;
    startAt: number;
    endAt: number;
    timetableId: number;
}

export interface ITimetable {
    timetableId: number;
    date: number;
}