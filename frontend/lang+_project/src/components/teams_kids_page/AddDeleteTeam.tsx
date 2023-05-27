import { Autocomplete, TextField } from "@mui/material";
import authApi from "api/authApi"
import { BlueUploadButton } from "components/BlueUploadButton";
import { RedDeleteButton } from "components/RedDeleteButton";
import { useBlueUploadButton } from "hooks/blue-upload-button";
import { useRedDeleteButton } from "hooks/red-delete-button";
import { ITeam } from "models";
import { useState } from "react";

interface IAddDeleteTeam {
    showModal: (text: string, isError: boolean) => void;
    teams: ITeam[];
    refresh: boolean | null;
    setRefresh: (refresh: boolean | null) => void;
}

export function AddDeleteTeam(props: IAddDeleteTeam) {
    const [value, setValue] = useState<string | undefined>()
    const [inputValue, setInputValue] = useState<string | undefined>()

    const { blueButton, setBlueButtonDefault, setBlueButtonLoading } = useBlueUploadButton({defaultText: "Добавить"})
    const { redButton, setRedButtonDefault, setRedButtonLoading } = useRedDeleteButton({defaultText: "Удалить"})

    async function addTeam() {
        setBlueButtonLoading()
        
        await authApi
            .post(
                "team/add",
                { title: inputValue }
            )
            .then(response => {
                setBlueButtonDefault()
                props.showModal(`Команда ${inputValue} успешно добавлена`, false)
                props.setRefresh(!props.refresh)
            })
            .catch (error => {
                console.log(error)
                props.showModal(error?.response?.data, true)
                setBlueButtonDefault()
            })   
    }

    async function deleteTeam() {
        setRedButtonLoading()
        
        await authApi
            .delete(
                "team/delete", 
                {
                    params: {
                        title: value
                    }
                }
            )
            .then(response => {
                setRedButtonDefault()
                props.showModal(`Команда ${value} успешно удалена`, false)
                props.setRefresh(!props.refresh)
            })
            .catch (error => {
                console.log(error)
                props.showModal(error?.response?.data, true)
                setRedButtonDefault()
            })             
    }

    return (
        <>
            <div className="add-delete-team-container">
                <p>Добавить/удалить команду</p>
                <div className="autocomplete-add-delete">
                    <Autocomplete
                        freeSolo
                        id="combo-box-teams-add-delete"
                        options={ props.teams.map(team => team.title) }
                        sx={{ width: 300 }}
                        value={ value }
                        onChange={ (event, newValue) => setValue(newValue) }
                        inputValue={ inputValue }
                        onInputChange={ (event, newInputValue) => setInputValue(newInputValue) }
                        disableClearable
                        renderInput={(params) => 
                            <TextField
                                {...params}
                                label="Название команды"
                                InputProps={{
                                ...params.InputProps,
                                type: 'search',
                                }}
                            />
                        }
                    />
                    <BlueUploadButton onClick={ () => addTeam() }><p>{ blueButton }</p></BlueUploadButton>
                    <RedDeleteButton onClick={ () => deleteTeam() }><p>{ redButton }</p></RedDeleteButton>
                </div>
            </div>
        </>
    )
}