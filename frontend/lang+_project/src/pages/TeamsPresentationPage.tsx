import "css-components/TeamsPresentationPage.css";
import { TeamDisplay } from "components/teams_presentation_page/TeamDisplay";
import { useTeam } from "hooks/teams";

export function TeamsPresentationPage() {

    const { teams } = useTeam()

    return (
        <>
            {teams && 
                <div className="teams-container">
                    {teams.map((team, i) => <TeamDisplay team={ teams[i] }/>)}
                </div>
            }
        </>
    )
}