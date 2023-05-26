import authApi from "api/authApi"
import defaultApi from "api/defaultApi";
import { ICreativeEvent } from "models";
import { useEffect, useState } from "react";

export function useCreativeEvents() {
    const [refreshCreativeEvents, setRefreshCreativeEvents] = useState<boolean>(false)
    const [creativeEvents, setCreativeEvents] = useState<ICreativeEvent[]>([])
    const [creativeEventTitle, setCreativeEventTitle] = useState<string | null>("")

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
        
        const eventToUpload: ICreativeEvent = { title: creativeEventTitle === null ? "" : creativeEventTitle }

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
        title: string
    ) {
        await authApi.delete(
            "creativity/events/delete",
            {
                params: {
                    title: title
                }
            }
        )
        .then(response => {
            showModal(`Меропритие "${title}" успешно удалено!`, false)
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
        creativeEventTitle,
        setCreativeEventTitle,
        deleteEvents,
        addEvent
    }
}