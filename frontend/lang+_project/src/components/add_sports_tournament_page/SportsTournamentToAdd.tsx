import { TextField } from "@mui/material";

export function SportsTournamentToAdd({setTournamentTitle, tournamentTitle}: {setTournamentTitle: (tournamentTitle: string) => void, tournamentTitle: string}) {
    return (
        <TextField 
            label="Название нового турнира" 
            variant="standard" 
            value={ tournamentTitle }
            onChange={ (event) => setTournamentTitle(event.target.value) }
        />
    );
}