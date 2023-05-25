import authApi from "api/authApi"
import { useModal } from "hooks/modal";
import { useCreativeEvents } from "hooks/creative_events";
import { ICreativeEvent, IModal, ITeam } from "models";
import { createContext } from "react";
import { useTeam } from "hooks/teams";
import { useCreativeEventPlaces } from "hooks/creative_events_places";

interface ICreativityContext {
    events: ICreativeEvent[];
    loadingEvents: boolean;
    errorEvents: string;
    setEventTitle: (title: string) => void;
    eventTitle: string;
    addEvent: (setButtonLoading: () => void, setButtonDefault: () => void, showModal: (text: string, isError: boolean) => void, setShow: (show: boolean) => void) => void;
    teams: ITeam[] | null;
    modal: IModal | null;
    showModal: (text: string, isError: boolean) => void;
    addSportsEvent: (setButtonLoading: () => void, setButtonDefault: () => void, showModal: (text: string, isError: boolean) => void, eventToUpload: ISportsEvent) => void;
    deleteSportsEvent: (showModal: (text: string, isError: boolean) => void, eventToDelete: ISportsEvent) => void;
    deleteSportsTournament: (showModal: (text: string, isError: boolean) => void, tournamentTitle: string) => void;
};

export const CreativityContext = createContext<ICreativityContext>({
    tournaments: [],
    loadingTournaments: false,
    errorTournaments: "",
    setTournamentTitle: (title: string) => {},
    tournamentTitle: "",
    addTournament: (setButtonLoading: () => void, setButtonDefault: () => void, showModal: (text: string, isError: boolean) => void, setShow: (show: boolean) => void) => {},
    teams: null,
    modal: null,
    showModal: (text: string, isError: boolean) => {},
    addSportsEvent: (setButtonLoading: () => void, setButtonDefault: () => void, showModal: (text: string, isError: boolean) => void, eventToUpload: ISportsEvent) => {},
    deleteSportsEvent: (setButtonLoading: () => void, setButtonDefault: () => void, showModal: (text: string, isError: boolean) => void, eventToDelete: ISportsEvent) => {},
    deleteSportsTournament: (showModal: (text: string, isError: boolean) => void, tournamentTitle: string) => {}
});

export const CreativityContextProvider = ({children}: {children: React.ReactNode}) => {
    const { 
        creativeEvents, 
        setEventTitle,
        eventTitle, 
        addEvent,
        refreshCreativeEvents,
        setRefreshCreativeEvents 
    } = useCreativeEvents()

    const { 
        places,
        addCreativeEventPlace,
        deleteCreativeEventPlace
     } = useCreativeEventPlaces({ eventTitle: "" })
    
    const { teams } = useTeam()
    const { modal, showModal } = useModal()

    const value = {
        tournaments,
        loadingTournaments,
        errorTournaments,
        setTournamentTitle,
        tournamentTitle,
        addTournament,
        teams,
        modal,
        showModal,
        addSportsEvent,
        deleteSportsEvent,
        deleteSportsTournament
    }

    return (
        <CreativityContext.Provider value={ value }>{ children }</CreativityContext.Provider>
    )
}