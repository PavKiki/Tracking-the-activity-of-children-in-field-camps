import { Autocomplete, TextField } from "@mui/material";
import { BlueUploadButton } from "components/BlueUploadButton";
import { CreativityContext } from "context/CreativityContext";
import closeIcon from "data/images/cancel_FILL0_wght400_GRAD0_opsz48.svg"
import { useBlueUploadButton } from "hooks/blue-upload-button";

import { IPlaceCreativeEvent, ITeam } from "models"
import { useContext, useState } from "react";

interface ICreativityTeams {
    places: IPlaceCreativeEvent[];
    teams: ITeam[] | null;
    place: number;
}

export function CreativityTeams(props: ICreativityTeams) {

    const { deleteCreativeEventPlace, showModal, addCreativeEventPlace } = useContext(CreativityContext)
    const [curTeam, setCurTeam] = useState<string | null>(null)
    const {blueButton, setBlueButtonLoading, setBlueButtonDefault} = useBlueUploadButton({defaultText: "Добавить"})

    return (
        <>
            {props.teams &&
                <div id="place">
                    <p>{ props.place } место</p>
                    { props.places
                        .filter((place) => { return place.place === props.place })
                        .map((place, i) => {
                            return (
                                <div className="creativity" key={ i }>
                                    <p>{ place.teamTitle }</p>
                                    <img src={ closeIcon } onClick={ () => deleteCreativeEventPlace(showModal, place) }/>
                                </div>
                            )
                    }) }
                    <div className="field-button">
                        <Autocomplete
                            freeSolo={true}
                            disablePortal
                            id={"combo-box-place" + props.place }
                            options={ props.teams.map(team => team.title) }
                            sx={{ width: "20vw" }}
                            renderInput={(params) => <TextField {...params} label="Название команды" />}
                            value={ curTeam ? curTeam : "" }
                            onChange={ (event, newValue) => setCurTeam(newValue) }
                            style={ {marginBottom: "2vh"} }
                        />
                        <BlueUploadButton onClick={ () => addCreativeEventPlace(setBlueButtonLoading, setBlueButtonDefault, showModal, props.place, curTeam ? curTeam : "" ) }>
                            <p>{ blueButton }</p>
                        </BlueUploadButton>
                    </div>
                </div>
            }
        </>
    )
}