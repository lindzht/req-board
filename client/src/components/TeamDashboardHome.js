import { Icon } from 'semantic-ui-react';
import { useParams, } from 'react-router-dom';
import { useState } from "react";
import TeamReqs from "./TeamReqs";
import TeamRecruiterCard from "./TeamRecruiterCard";
import AddRecruiterCard from './AddRecruiterCard';
import TeamAddReq from './TeamAddReq';
import Loading from './Loading';

function TeamDashboardHome({currentTeam, deleteRecruiterFromTeam, companies, addNewReq, setNewTeamReq, newTeamReq, setNewData, setReqSearchID, reqSearchID, setRecruiterSearchID, recruiterSearchID, createRecTeamRelationship, deleteReq, deleteReqFromTeam, updateReq}) {

    const [displayAddForm, setDisplayAddForm] = useState(false)
    const [displayEditIcon, setDisplayEditIcon] = useState(false)
    const [displayDeleteIcon, setDisplayDeleteIcon] = useState(false)

    const [displayRecruiterForm, setDisplayRecruiterForm] = useState(false)
    let params = useParams();

    function renderOpenReqTable (){
        return(<TeamReqs currentTeam={currentTeam} deleteReq={deleteReq} deleteReqFromTeam={deleteReqFromTeam} displayEditIcon={displayEditIcon} displayDeleteIcon={displayDeleteIcon} updateReq={updateReq}/>)
    }

    function renderRecruiters (){
        return( 
            currentTeam.recruiters.map((recruiter) => {
                return(<TeamRecruiterCard key={recruiter.id} currentTeam={currentTeam} recruiter={recruiter} deleteRecruiterFromTeam={deleteRecruiterFromTeam}/>)
            }))
    }

    function handleDisplayAddForm(){
        setDisplayAddForm(!displayAddForm);
    }

    function displayEditIcons(){
        setDisplayEditIcon(!displayEditIcon)
        setDisplayDeleteIcon(false)
    }

    function displayDeleteIcons(){
        setDisplayDeleteIcon(!displayDeleteIcon)
        setDisplayEditIcon(false)
    }


    return(
        
        <div id="team-container">
            {currentTeam && currentTeam.id == params.teamId ? 
            <>
                {displayAddForm ? 
                    <>
                    <TeamAddReq 
                    companies={companies} 
                    currentTeam={currentTeam} 
                    addNewReq={addNewReq} 
                    setNewTeamReq={setNewTeamReq} 
                    newTeamReq={newTeamReq} 
                    setNewData={setNewData} 
                    setReqSearchID={setReqSearchID}
                    reqSearchID={reqSearchID}
                    handleDisplayAddForm={handleDisplayAddForm}/>
                    </>
                : null}
            <div id="team-container-left"> 
                        <div className='req-container'>
                            <div id="req-top-container">
                                <h1>Open Reqs</h1>
                                <div id="icons">

                                </div>
                                <Icon size="big" name="add circle" onClick={handleDisplayAddForm} />   
                                <Icon size='big' name="pencil" onClick={displayEditIcons} /> 
                                <Icon size="big" name="trash alternate outline" onClick={displayDeleteIcons} />
                            </div>
                            {renderOpenReqTable()}

                        </div>
                       
            </div>
            <div id="team-container-right">

                
                <div id="team-metrics-card-container">
                    <h1>{currentTeam.open_reqs}</h1>
                    <h3>Open Reqs</h3>
                </div>
                
                
                <div id="team-metrics-card-container"> 
                    <div className={currentTeam.hired_reqs > 0 ? "hired-highlight" : null }>
                        <h1>{currentTeam.hired_reqs}</h1>
                        <h3>Hired Reqs</h3>
                    </div>  
                </div>
            

                <div id="team-block">
                    <h3>Teammates</h3>
                    <div className='team-recruiters'>
                        {renderRecruiters()}
                        {displayRecruiterForm ? 
                        <>
                            <Icon name="minus circle" className='add-icon' onClick={()=> {setDisplayRecruiterForm(!displayRecruiterForm)}}/>

                            <AddRecruiterCard companies={companies} currentTeam={currentTeam} setRecruiterSearchID={setRecruiterSearchID}
                            recruiterSearchID={recruiterSearchID}
                            createRecTeamRelationship={createRecTeamRelationship} /> 
                        </> :  
                            <Icon name="circle add" className='add-icon' onClick={()=> {setDisplayRecruiterForm(!displayRecruiterForm)}} /> }
                    </div>  
                </div>

            </div>
            </>
            : 
            <Loading />
            }

        </div>
    )
}

export default TeamDashboardHome;