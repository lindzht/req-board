import { Button } from 'semantic-ui-react'

function Settings ({currentUser}){

    console.log(currentUser)

    return(
        <div className="dashboard-container">
            <div id="settings-card">
                <div id="settings-left-content">
                    <h1>Hello<br /><span>{currentUser.first_name}</span></h1>
                    <h3>{currentUser.admin ? `${currentUser.company.name} Admin`: null}</h3>
                </div>
                <div id="settings-right-content">
                    <p><span className="title">First Name:</span> <br /> {currentUser.first_name}</p>
                    <p><span className="title">Last Name:</span> <br />{currentUser.last_name}</p>
                    <p><span className="title">Email:</span> <br />{currentUser.email}</p>
                    <p><span className="title">Company:</span> <br />{currentUser.company.name}</p>
                    <Button color='black'>Edit</Button>
                </div>
            </div>

        </div>
    )
}

export default Settings;