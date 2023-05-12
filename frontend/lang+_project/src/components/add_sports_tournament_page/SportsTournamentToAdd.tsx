import { TextField } from "@mui/material";

interface ISportsTournamentToAdd {
    setTournamentTitle: (tournamentTitle: string) => void;
    tournamentTitle: string;
}

export function SportsTournamentToAdd(props : ISportsTournamentToAdd) {
    return (
        <div className="tournament-title-text-field">
            <TextField 
                fullWidth
                multiline 
                rows="2" 
                label="Название нового турнира" 
                value={ props.tournamentTitle } 
                onChange={ (event) => props.setTournamentTitle(event.target.value) }
            />
        </div>
    );
}