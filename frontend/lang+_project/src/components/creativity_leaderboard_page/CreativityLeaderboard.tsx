import { ICreativeEvent, IPlaceCreativeEvent } from "models"
import firstPlaceMedal from "data/images/first-medal-icon.svg"
import secondPlaceMedal from "data/images/second-medal-icon.svg"
import thirdPlaceMedal from "data/images/third-medal-icon.svg"
import { useCreativeEventPlaces } from "hooks/creative_events_places";

interface ICreativityLeaderboard {
    event: ICreativeEvent;
}

export function CreativityLeaderboard(props: ICreativityLeaderboard) {
    const { places } = useCreativeEventPlaces({ eventTitle: props.event?.title })

    return (
        <table className="creativity-leaderboard">
            {places &&
                <tbody>
                    <tr id="first-place">
                        <th>
                            <img src={ firstPlaceMedal } alt="First place"/>
                        </th>
                        <td>
                            { places
                                .filter((place) => { return place.place === 1 })
                                .map((place, i) => <p key={i}>{ place.teamTitle }</p>) 
                            }
                        </td>
                    </tr>
                    <tr id="second-place">
                        <th>
                            <img src={ secondPlaceMedal } alt="Second place"/>
                        </th>
                        <td>
                            { places
                                .filter((place) => { return place.place === 2 })
                                .map((place, i) => <p key={i}>{ place.teamTitle }</p>) 
                            }
                        </td>
                    </tr>
                    <tr id="third-place">
                        <th>
                            <img src={ thirdPlaceMedal } alt="Third place"/>
                        </th>
                        <td>
                            { places
                                .filter((place) => { return place.place === 3 })
                                .map((place, i) => <p key={i}>{ place.teamTitle }</p>) 
                            }
                        </td>
                    </tr>
                </tbody>
            }
        </table>
    )
}