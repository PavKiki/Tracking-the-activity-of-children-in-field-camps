import React, { useState } from 'react';
import { NavigationPanel } from "../components/NavigationPanel";
import { Timetable } from "../components/Timetable";
import { useTimetables } from "../hooks/timetables";
import { ITimetable } from '../models';

export function MainPage() {
    const { timetables } = useTimetables()

    return (
    <>
        <NavigationPanel></NavigationPanel>
        <div className="timetables-view">
            {/* Проблема была в том, что у меня статически шло обращение к первому элементу массива, а нужно было динамически через мапу их выдавать в реакт дом */}
            { timetables.map( timetable => <Timetable timetable={ timetable }></Timetable> ) }
        </div>
    </>
    );
}