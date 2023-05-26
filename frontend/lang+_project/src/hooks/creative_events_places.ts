import authApi from "api/authApi";
import defaultApi from "api/defaultApi"
import { ICreativeEvent, IPlaceCreativeEvent, ITeam } from "models"
import { useEffect, useState } from "react"

interface IUseCreativeEventPlaces {
    eventTitle: string | null;
}

export function useCreativeEventPlaces(props: IUseCreativeEventPlaces) {
    const [places, setPlaces] = useState<IPlaceCreativeEvent[]>([])
    const [refreshPlaces, setRefreshPlaces] = useState<boolean>(false)

    useEffect(() => {
        fetchPlaces()      
    }, [refreshPlaces, props.eventTitle])

    async function addCreativeEventPlace(
        setButtonLoading: () => void, 
        setButtonDefault: () => void, 
        showModal: (text: string, isError: boolean) => void,
        place: number,
        teamTitle: string
    ) {
        if (props.eventTitle === undefined || props.eventTitle === null) return
        setButtonLoading()
        
        const placeToUpload: IPlaceCreativeEvent = { 
            id: 0,
            place: place,
            eventTitle: props.eventTitle,
            teamTitle: teamTitle
        }

        await authApi.post(
                "creativity/places/add",
                placeToUpload
            )
            .then(response => {
                setButtonDefault()
                showModal(`Результат команды ${teamTitle} в ${props.eventTitle} успешно добавлен!`, false)
                setRefreshPlaces(!refreshPlaces)
            })
            .catch (error => {
                console.log(error)
                showModal(error?.response?.data, true)
                setButtonDefault()
            })             
    }

    async function deleteCreativeEventPlace(
        showModal: (text: string, isError: boolean) => void,
        placeToDelete: IPlaceCreativeEvent
    ) {
        await authApi.delete(
            "creativity/places/delete",
            {
                params: {
                    id: placeToDelete.id
                }
            }
        )
        .then(response => {
            showModal(`Команда ${placeToDelete.teamTitle} успешно удалена из ${placeToDelete.eventTitle}!`, false)
            setRefreshPlaces(!refreshPlaces)
        })
        .catch (error => {
            console.log(error)
            showModal(error?.response?.data, true)
        })   
    }

    async function fetchPlaces() {
        if (props.eventTitle === undefined || props.eventTitle === null) return
        await defaultApi
            .get<IPlaceCreativeEvent[]>(
                "creativity/places/byEvent",
                { params: { title: props.eventTitle } }
            )
            .then((response) => {
                setPlaces(response.data)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return { 
        places,
        addCreativeEventPlace,
        deleteCreativeEventPlace,
    }
}