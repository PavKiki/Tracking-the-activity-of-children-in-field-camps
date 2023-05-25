import authApi from "api/authApi"
import defaultApi from "api/defaultApi";
import { ICreativeEvent } from "models";
import { useEffect, useState } from "react";

export function useCreativeEvents() {
    const [refreshCreativeEvents, setRefreshCreativeEvents] = useState<boolean>(false)
    const [creativeEvents, setCreativeEvents] = useState<ICreativeEvent[]>([])
    const [eventTitle, setEventTitle] = useState<string>("")

    useEffect( () => { 
        fetchEvents()
    }, [refreshCreativeEvents])

    async function addEvent(
            setButtonLoading: () => void, 
            setButtonDefault: () => void, 
            showModal: (text: string, isError: boolean) => void,
            setShow: (show: boolean) => void
        ) {
        setButtonLoading()
        
        const eventToUpload: ICreativeEvent = { title: eventTitle }

        await authApi.post(
            "creativity/events/add",
            eventToUpload
        )
        .then(response => {
            setButtonDefault()
            showModal(`Творческое мероприятие ${eventToUpload.title} успешно добавлено!`, false)
            setRefreshCreativeEvents(!refreshCreativeEvents)
            setShow(false)
        })
        .catch (error => {
            console.log(error)
            showModal(error?.response?.data, true)
            setButtonDefault()
        })             
    }

    async function deleteEvents(
        showModal: (text: string, isError: boolean) => void,
    ) {
        await authApi.delete(
            "creativity/events/delete",
            {
                params: {
                    title: eventTitle
                }
            }
        )
        .then(response => {
            showModal(`Меропритие "${eventTitle}" успешно удалено!`, false)
            setRefreshCreativeEvents(!refreshCreativeEvents)
        })
        .catch (error => {
            console.log(error)
            showModal(error?.response?.data, true)
        })   
    }

    async function fetchEvents() {      
        
        await defaultApi
            .get<ICreativeEvent[]>(
                "creativity/events/all",
            )
            .then((response) => {
                setCreativeEvents(response.data)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return { 
        creativeEvents, 
        setEventTitle,
        eventTitle, 
        addEvent,
        refreshCreativeEvents,
        setRefreshCreativeEvents
    }
}