import api from "api/axios";
import { useModal } from "hooks/modal";
import { useTeam } from "hooks/teams";
import { useSportsTournaments } from "hooks/tournaments";
import { IModal, ISportsEvent, ISportsTournament, ITeam } from "models";
import { createContext } from "react";

interface IAddSportsContext {
    tournaments: ISportsTournament[];
    loadingTournaments: boolean;
    errorTournaments: string;
    setTournamentTitle: (title: string) => void;
    tournamentTitle: string;
    addTournament: (setButtonLoading: () => void, setButtonDefault: () => void, showModal: (text: string, isError: boolean) => void) => void;
    teams: ITeam[] | null;
    modal: IModal | null;
    showModal: (text: string, isError: boolean) => void;
    addSportsEvent: (setButtonLoading: () => void, setButtonDefault: () => void, showModal: (text: string, isError: boolean) => void, eventToUpload: ISportsEvent) => void;
};

export const AddSportsContext = createContext<IAddSportsContext>({
    tournaments: [],
    loadingTournaments: false,
    errorTournaments: "",
    setTournamentTitle: (title: string) => {},
    tournamentTitle: "",
    addTournament: (setButtonLoading: () => void, setButtonDefault: () => void, showModal: (text: string, isError: boolean) => void) => {},
    teams: null,
    modal: null,
    showModal: (text: string, isError: boolean) => {},
    addSportsEvent: (setButtonLoading: () => void, setButtonDefault: () => void, showModal: (text: string, isError: boolean) => void, eventToUpload: ISportsEvent) => {}
});

export const AddSportsContextProvider = ({children}: {children: React.ReactNode}) => {
    const { tournaments, loadingTournaments, errorTournaments, setTournamentTitle, tournamentTitle, addTournament } = useSportsTournaments()
    const { teams } = useTeam()
    const { modal, showModal } = useModal()

    async function addSportsEvent(
        setButtonLoading: () => void, 
        setButtonDefault: () => void, 
        showModal: (text: string, isError: boolean) => void,
        eventToUpload: ISportsEvent
    ) {
        setButtonLoading()
        
        await api.post(
            "sports/event/add",
            eventToUpload,
            {
                withCredentials: true,
            }
        )
        .then(response => {
            setButtonDefault()
            showModal(`Игра ${eventToUpload.teamOneName} и ${eventToUpload.teamTwoName} в турнире по "${eventToUpload.sportTitle}" успешно добавлена!`, false)
        })
        .catch (error => {
            console.log(error)
            showModal(error?.response?.data, true)
            setButtonDefault()
        })   
    }

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
        addSportsEvent
    }

    return (
        <AddSportsContext.Provider value={ value }>{ children }</AddSportsContext.Provider>
    )
}