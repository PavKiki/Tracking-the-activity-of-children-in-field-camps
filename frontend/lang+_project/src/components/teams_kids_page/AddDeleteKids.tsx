import { Autocomplete, Checkbox, FormControlLabel, TextField } from "@mui/material";
import api from "api/axios";
import { IChild, ITeam } from "models";
import { useEffect, useState } from "react";
import closeIcon from "data/images/cancel_FILL0_wght400_GRAD0_opsz48.svg"
import { useBlueUploadButton } from "hooks/blue-upload-button";
import { BlueUploadButton } from "components/BlueUploadButton";

interface IAddDeleteKids {
    showModal: (text: string, isError: boolean) => void;
    teams: ITeam[];
}

export function AddDeleteKids(props: IAddDeleteKids) {
    const [curTeam, setCurTeam] = useState<string | null>(null)
    const [participants, setParticipants] = useState<IChild[]>([])
    const [refreshKids, setRefreshKids] = useState<boolean | null>(null)

    const [surname, setSurname] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)
    const [patronymic, setPatronymic] = useState<string | null>(null)
    const [age, setAge] = useState<number | null>(null)
    const [isCap, setIsCap] = useState<boolean>(false)
    const [isCocap, setIsCocap] = useState<boolean>(false)

    useEffect(() => {
        findParicipants()
    }, [curTeam, refreshKids])

    const { blueButton, setBlueButtonDefault, setBlueButtonLoading } = useBlueUploadButton({defaultText: "Добавить"})
    

    async function findParicipants() {
        if (curTeam === null) return
        await api
            .get(
                "child/byteamTitle",
                {
                    withCredentials: true,
                    params: {
                        title: curTeam
                    }
                }
            )
            .then(response => {
                setParticipants(response.data)
                setRefreshKids(!refreshKids)
            })
            .catch (error => {
                console.log(error)
            })
    }

    async function addKid() {
        if (curTeam === null) return
        setBlueButtonLoading()

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
                        title: curTeam
                    }
                }
            )
            .then(response => {
                props.showModal(
                    `${surname} ${name} ${patronymic} - ${age} лет успешно добавлен в команду ${curTeam}`,
                    false
                )
                setBlueButtonDefault()
                setRefreshKids(!refreshKids)
            })
            .catch (error => {
                setBlueButtonDefault()
                console.log(error)
                props.showModal(
                    error?.data?.response,
                    true
                )
            })
    }

    async function deleteChild(kid: IChild) {
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
                props.showModal(`${kid.surname} ${kid.name} ${kid.patronymic} - ${kid.age} лет успешно удален`, false)
                setRefreshKids(!refreshKids)
            })
            .catch (error => {
                console.log(error)
                props.showModal(error?.response?.data, true)
            })             
    }

    return (
    <>
        <div className="add-delete-kids-container">
            <p>Добавить участников в команду</p>
            <Autocomplete
                disablePortal
                id="combo-box-teams"
                options={ props.teams.map(team => team.title) }
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Название команды" />}
                value={ curTeam }
                onChange={ (event, newValue) => setCurTeam(newValue) }
            />
            <div className="existing-kids">
                { participants.map((kid, i) => {
                    return <div className="kid" key={ i }>
                                <p>{i + 1}. { kid.surname } { kid.name } { kid.patronymic }  /  { kid.age } y.o.  /  { kid.teamRole }</p>
                                <img src={ closeIcon } onClick={ () => {deleteChild(kid)} }/>
                            </div>
                }) }
            </div>
            <div className="add-kid-field">
                <TextField 
                    label="Фамилия" 
                    value={ surname } 
                    onChange={ (event) => setSurname(event.target.value) }
                />
                <TextField 
                    label="Имя" 
                    value={ name } 
                    onChange={ (event) => setName(event.target.value) }
                />
                <TextField 
                    label="Отчество" 
                    value={ patronymic } 
                    onChange={ (event) => setPatronymic(event.target.value) }
                />
                <TextField 
                    type="number"
                    label="Возраст" 
                    value={ age } 
                    sx={ { width: 100 } }
                    onChange={ (event) => setAge(Number(event.target.value)) }
                />
                <FormControlLabel
                    value="Cap"
                    control={
                        <Checkbox 
                            checked={ isCap }
                            onChange={ (event) => setIsCap(event.target.checked) }
                        />
                    }
                    label="Cap"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="Cocap"
                    control={
                        <Checkbox 
                            checked={ isCocap }
                            onChange={ (event) => setIsCocap(event.target.checked) }
                        />
                    }
                    label="Cocap"
                    labelPlacement="top"
                />
            </div>
            <BlueUploadButton onClick={ () => addKid() }><p>{ blueButton }</p></BlueUploadButton>
        </div>
    </>
    )
}