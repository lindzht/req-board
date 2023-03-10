import { Link, Outlet } from 'react-router-dom';

function MyDashboardNav(){
    return(
        <div className="sub-nav-container">
           
            <nav>
                <Link to="/dashboard"><button className="dash-nav-button">My Dashboard</button></Link>
                <Link to="myreqs"><button className="dash-nav-button">My Open Reqs</button></Link>
                <Link to="myhires"><button className="dash-nav-button">My Hires</button></Link>
                {/* <Link to="myhires"><button className="dash-nav-button">My Metrics</button></Link> */}
                {/* <Link to="mygoals"><button className="dash-nav-button">My Goals</button></Link> */}
            </nav>
            
            <Outlet />
        </div>
    )
}

export default MyDashboardNav;