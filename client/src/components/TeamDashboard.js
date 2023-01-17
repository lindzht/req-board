import TeamSubNav from "./TeamSubNav";
// import MyReqs from "./MyReqsPage";
import { Icon } from 'semantic-ui-react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


function TeamDashboard ( {currentUser, teamData} ){
    let params = useParams();
    // console.log(params)
    // console.log(teamData);

    let teamID = params.teamId
    
    // useEffect(() => {
    //   fetch(`/teams/${teamID}`)
    //   .then(res => {
    //     if (res.ok){
    //       res.json()
    //       .then(data => {
    //         console.log(data)
    //       })
    //     }
    //   })
    // }, [teamID])




    return(
        <div className="dashboard-container">
            <div id="user-display"><Link to="/settings"><Icon name="user circle"></Icon><p>{currentUser && currentUser.first_name} {currentUser.admin? "(Admin)" : null}</p></Link></div>
            <div className="dashboard-header">
                <h1>{currentUser.first_name} 's Board</h1>
            </div>
            <TeamSubNav />
        </div> 
    )
}

export default TeamDashboard;