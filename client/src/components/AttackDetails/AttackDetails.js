import React from 'react'
import { graphql} from "react-apollo";
import {getAttackQuery} from "../../queries/queries"
import ReactPlayer from 'react-player'

const AttackDetails = (props) => {
  const displayAttackDetails = () => {
    const attack = props.data.attack
    if(attack){
      return <ReactPlayer url={attack.link} />
    }else{
      return <h1>click on attack</h1>
    }
  }
  console.log(props.data.attack)
  return (
    
    <div id="attack-details">
      {displayAttackDetails()}
    </div>
  )
}

export default graphql(getAttackQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.attackId
      }
    }
  }
})(AttackDetails)
