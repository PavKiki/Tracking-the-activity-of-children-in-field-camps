import { Autocomplete, TextField } from "@mui/material";
import { CreativityContext } from "context/CreativityContext";
import { useContext } from "react";
import { CreativityTeams } from "./CreativityTeams";
import { useTeam } from "hooks/teams";

export function AddCreativity() {
    const { creativeEvents, creativeEventTitle, setCreativeEventTitle, places } = useContext(CreativityContext)
    const { teams } = useTeam()
    
    return (
        <>
            <div className="new-sports-event">
                <p>Добавить результаты</p>
                <Autocomplete
                    freeSolo={ true }
                    disablePortal
                    id="combo-box-tournamnets"
                    options={ creativeEvents.map(creativeEvent => creativeEvent.title) }
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Введите название мероприятия" />}
                    value={ creativeEventTitle ? creativeEventTitle : "" }
                    onChange={ (event, newValue) => {
                        setCreativeEventTitle(newValue)
                    } }
                />
                <CreativityTeams place={ 1 } teams={ teams } places={ places }/>
                <CreativityTeams place={ 2 } teams={ teams } places={ places }/>
                <CreativityTeams place={ 3 } teams={ teams } places={ places }/>
            </div>
        </>
    )
}