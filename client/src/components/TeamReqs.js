import _ from 'lodash'
import React from 'react'
import { Table, Icon } from 'semantic-ui-react'
import { Link, Outlet, useParams } from 'react-router-dom';

  
function TeamReqs( {currentTeam}) {

    const tableData = currentTeam.reqs

    function exampleReducer(state, action) {
      switch (action.type) {
        case 'CHANGE_SORT':
          if (state.column === action.column) {
            return {
              ...state,
              data: state.data.slice().reverse(),
              direction:
                state.direction === 'ascending' ? 'descending' : 'ascending',
            }
          }
          return {
            column: action.column,
            data: _.sortBy(state.data, [action.column]),
            direction: 'ascending',
          }
        default:
          throw new Error()
      }
    }

    const [state, dispatch] = React.useReducer(exampleReducer, {
      column: null,
      data: tableData,
      direction: null,
    })
    const { column, data, direction } = state

  // if (!currentTeam) return ("Loading...")
    return (
      <>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'req_id' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'req_id' })}
                id="req-id-column"
              >
                <p >Req ID</p>
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'org' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'org' })}
              >
                Team
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'hiring_manager' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'hiring_manager' })}
              >
                Recruiter
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'hiring_manager' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'hiring_manager' })}
              >
                Hiring Manager
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'open_date' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'open_date' })}
              >
                Role Open Date
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'hire_goal' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'hire_goal' })}
              >
                Goal Hire Date
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'hired_status' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'hired_status' })}
              >
                Hired Status
              </Table.HeaderCell>
              {/* <Table.HeaderCell id="edit-req-column">
                Edit
              </Table.HeaderCell> */}

            
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(({ req_id, name, org, hiring_manager, open_date, hire_goal, hired_status, hired_date, candidate, candidate_app, recruiter }) => (
              <Table.Row id={hired_status === "Hired" ? "req-row-hired" : "req-row"} key={req_id}>
                <Table.Cell>{req_id}</Table.Cell>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{org}</Table.Cell>
                {recruiter && recruiter.first_name ? <Table.Cell>{recruiter.first_name} {recruiter.last_name}</Table.Cell> : <Table.Cell></Table.Cell>}
                <Table.Cell>{hiring_manager}</Table.Cell>
                <Table.Cell>{open_date}</Table.Cell>
                <Table.Cell>{hire_goal}</Table.Cell>
                <Table.Cell>{hired_status}</Table.Cell>
                {/* <Table.Cell><Icon name="pencil alternate" size='large'/><Icon name="x" size='large'/></Table.Cell> */}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    )
  }
  

export default TeamReqs;