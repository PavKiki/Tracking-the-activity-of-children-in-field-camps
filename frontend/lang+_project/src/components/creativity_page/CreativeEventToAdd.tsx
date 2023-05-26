import { TextField } from "@mui/material";

interface ICreativeEventToAdd {
    setEventTitle: (tournamentTitle: string) => void;
    eventTitle: string | null;
}

export function CreativeEventToAdd(props : ICreativeEventToAdd) {
    return (
        <div className="tournament-title-text-field">
            <TextField 
                fullWidth
                multiline 
                rows="2" 
                label="Название нового мероприятия" 
                value={ props.eventTitle } 
                onChange={ (event) => props.setEventTitle(event.target.value) }
            />
        </div>
    );
}