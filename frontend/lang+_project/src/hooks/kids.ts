import api from "api/axios";
import { IChild } from "models";
import { useEffect, useState } from "react"

interface IUseKids {
    curTeam: string | null;
}

export function useKidsInTeam(props: IUseKids) {
    const [participants, setParticipants] = useState<IChild[]>([])
    const [refreshKids, setRefreshKids] = useState<boolean | null>(null)

    useEffect(() => {
        findParicipantsOfTeam()
    }, [props.curTeam, refreshKids])

    async function findParicipantsOfTeam() {
        if (props.curTeam === null) return
        await api
            .get(
                "child/byteamTitle",
                {
                    params: {
                        title: props.curTeam
                    }
                }
            )
            .then(response => {
                setParticipants(response.data)
                // setRefreshKids(!refreshKids)
            })
            .catch (error => {
                console.log(error)
            })
    }

    async function addKidInTeam(
        showModal: (text: string, isError: boolean) => void,
        setLoading: () => void, 
        setDefault: () => void, 
        isCap: boolean,
        isCocap: boolean,
        surname: string | null,
        name: string | null,
        patronymic: string | null,
        age: number | null
    ) {
        if (props.curTeam === null) return
        setLoading()

        let role: string

        if (isCap && !isCocap) role = "CAPTAIN"
        else if (!isCap && isCocap) role = "COCAPTAIN"
        else role = "DEFAULT"
        
        const kidToUpload: IChild = {
            id: 0,
            surname: surname!!,
            name: name!!,
            patronymic: patronymic!!,
            age: age!!,
            teamRole: role
        }
        
        await api
            .post(
                "child/addToTeam",
                kidToUpload,
                {
                    withCredentials: true,
                    params: {
                        title: props.curTeam
                    }
                }
            )
            .then(response => {
                showModal(
                    `${surname} ${name} ${patronymic} - ${age} лет успешно добавлен в команду ${props.curTeam}`,
                    false
                )
                setDefault()
                setRefreshKids(!refreshKids)
            })
            .catch (error => {
                setDefault()
                console.log(error)
                showModal(
                    error?.data?.response,
                    true
                )
            })
    }

        async function deleteKid(showModal: (text: string, isError: boolean) => void, kid: IChild) {
        await api
            .delete(
                "child/delete", 
                {
                    withCredentials: true,
                    params: {
                        id: kid.id
                    }
                }
            )
            .then(response => {
                showModal(`${kid.surname} ${kid.name} ${kid.patronymic} - ${kid.age} лет успешно удален`, false)
                setRefreshKids(!refreshKids)
            })
            .catch (error => {
                console.log(error)
                showModal(error?.response?.data, true)
            })             
    }

    return { participants, addKidInTeam, deleteKid }
}