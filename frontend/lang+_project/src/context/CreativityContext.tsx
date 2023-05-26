import authApi from "api/authApi"
import { useModal } from "hooks/modal";
import { useCreativeEvents } from "hooks/creative_events";
import { ICreativeEvent, IModal, IPlaceCreativeEvent, ITeam } from "models";
import { createContext, useState } from "react";
import { useTeam } from "hooks/teams";
import { useCreativeEventPlaces } from "hooks/creative_events_places";

interface ICreativityContext {
    creativeEvents: ICreativeEvent[]; 
    creativeEventTitle: string | null;
    setCreativeEventTitle: (title: string | null) => void;
    addEvent: (
        setButtonLoading: () => void, 
        setButtonDefault: () => void, 
        showModal: (text: string, isError: boolean) => void, 
        setShow: (show: boolean) => void
    ) => void;
    deleteEvents: (showModal: (text: string, isError: boolean) => void, title: string) => void;
    places: IPlaceCreativeEvent[];
    addCreativeEventPlace: (
        setButtonLoading: () => void, 
        setButtonDefault: () => void, 
        showModal: (text: string, isError: boolean) => void, 
        place: number,
        team: string
    ) => void;
    deleteCreativeEventPlace: (showModal: (text: string, isError: boolean) => void, placeToDelete: IPlaceCreativeEvent) => void;
    teams: ITeam[] | null;
    modal: IModal | null;
    showModal: (text: string, isError: boolean) => void;
};

export const CreativityContext = createContext<ICreativityContext>({
    creativeEvents: [], 
    creativeEventTitle: "",
    setCreativeEventTitle: (title: string | null) => {},
    addEvent: (
        setButtonLoading: () => void, 
        setButtonDefault: () => void, 
        showModal: (text: string, isError: boolean) => void, 
        setShow: (show: boolean) => void
    ) => {},
    deleteEvents: (showModal: (text: string, isError: boolean) => void, title: string) => {},
    places: [],
    addCreativeEventPlace: (
        setButtonLoading: () => void, 
        setButtonDefault: () => void, 
        showModal: (text: string, isError: boolean) => void, 
        place: number,
        team: string
    ) => {},
    deleteCreativeEventPlace: (showModal: (text: string, isError: boolean) => void, placeToDelete: IPlaceCreativeEvent) => {},
    teams: null,
    modal: null,
    showModal: (text: string, isError: boolean) => {}
});

export const CreativityContextProvider = ({children}: {children: React.ReactNode}) => {
    const { 
        creativeEvents, 
        creativeEventTitle,
        setCreativeEventTitle,
        addEvent,
        deleteEvents
    } = useCreativeEvents()

    const { 
        places,
        addCreativeEventPlace,
        deleteCreativeEventPlace,
     } = useCreativeEventPlaces({ eventTitle: creativeEventTitle })
    
    const { teams } = useTeam()
    const { modal, showModal } = useModal()

    const value = {
        creativeEvents, 
        creativeEventTitle,
        setCreativeEventTitle,
        addEvent,
        deleteEvents,
        places,
        addCreativeEventPlace,
        deleteCreativeEventPlace,
        teams,
        modal,
        showModal
    }

    return (
        <CreativityContext.Provider value={ value }>{ children }</CreativityContext.Provider>
    )
}