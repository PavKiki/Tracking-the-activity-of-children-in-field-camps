import authApi from "api/authApi"
import { useModal } from "hooks/modal";
import { useTeam } from "hooks/teams";
import { useSportsTournaments } from "hooks/tournaments";
import { IModal, ISportsEvent, ISportsTournament, ITeam } from "models";
import { createContext } from "react";

interface ISportsContext {
    tournaments: ISportsTournament[];
    loadingTournaments: boolean;
    errorTournaments: string;
    setTournamentTitle: (title: string) => void;
    tournamentTitle: string;
    addTournament: (setButtonLoading: () => void, setButtonDefault: () => void, showModal: (text: string, isError: boolean) => void, setShow: (show: boolean) => void) => void;
    teams: ITeam[] | null;
    modal: IModal | null;
    showModal: (text: string, isError: boolean) => void;
    addSportsEvent: (setButtonLoading: () => void, setButtonDefault: () => void, showModal: (text: string, isError: boolean) => void, eventToUpload: ISportsEvent) => void;
    deleteSportsEvent: (setButtonLoading: () => void, setButtonDefault: () => void, showModal: (text: string, isError: boolean) => void, eventToDelete: ISportsEvent) => void;
    deleteSportsTournament: (showModal: (text: string, isError: boolean) => void, tournamentTitle: string) => void;
};

export const SportsContext = createContext<ISportsContext>({
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

export const SportsContextProvider = ({children}: {children: React.ReactNode}) => {
    const { 
        tournaments, 
        loadingTournaments, 
        errorTournaments, 
        setTournamentTitle, 
        tournamentTitle, 
        addTournament,
        refreshTournaments,
        setRefreshTornaments
    } = useSportsTournaments()

    const { teams } = useTeam()
    const { modal, showModal } = useModal()

    async function addSportsEvent(
        setButtonLoading: () => void, 
        setButtonDefault: () => void, 
        showModal: (text: string, isError: boolean) => void,
        eventToUpload: ISportsEvent
    ) {
        setButtonLoading()
        
        await authApi.post(
            "sports/event/add",
            eventToUpload
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

    async function deleteSportsEvent(
        setButtonLoading: () => void, 
        setButtonDefault: () => void, 
        showModal: (text: string, isError: boolean) => void,
        eventToDelete: ISportsEvent
    ) {
        setButtonLoading()
        
        await authApi.delete(
            "sports/event/delete",
            {
                params: {
                    t1: eventToDelete.teamOneName,
                    t2: eventToDelete.teamTwoName,
                    s: eventToDelete.sportTitle
                }
            }
        )
        .then(response => {
            setButtonDefault()
            showModal(`Игра ${eventToDelete.teamOneName} и ${eventToDelete.teamTwoName} в турнире "${eventToDelete.sportTitle}" успешно удалена!`, false)
        })
        .catch (error => {
            console.log(error)
            showModal(error?.response?.data, true)
            setButtonDefault()
        })   
    }

    async function deleteSportsTournament(
        showModal: (text: string, isError: boolean) => void,
        tournamentTitle: string
    ) {
        await authApi.delete(
            "sports/tournament/delete",
            {
                params: {
                    s: tournamentTitle
                }
            }
        )
        .then(response => {
            showModal(`Турнир "${tournamentTitle}" успешно удален!`, false)
            setRefreshTornaments(!refreshTournaments)
        })
        .catch (error => {
            console.log(error)
            showModal(error?.response?.data, true)
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
        addSportsEvent,
        deleteSportsEvent,
        deleteSportsTournament
    }

    return (
        <SportsContext.Provider value={ value }>{ children }</SportsContext.Provider>
    )
}