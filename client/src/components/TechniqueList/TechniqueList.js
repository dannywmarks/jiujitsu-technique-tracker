import React, {useState} from "react";
import { graphql } from "react-apollo";
import { getAttacksQuery } from '../../queries/queries'
import AttackDetails from '../../components/AttackDetails/AttackDetails.js'



const TechniqueList = (props) => {
   let initialState = {
    selected: null,
  
  };
  const [attackId, setAttackId] = useState(initialState);

 
  const displayAttacks = () => {
    var data = props.data;

    return data.loading ? (
      <div>loading...</div>
    ) : (
      data.attacks.map((attack) => {
        return <li key={attack.id} onClick={(e) => { 
          setAttackId(attack.id)
          }}>{attack.name}</li>;
      })
    );
  };

  return (
    <div>
      <ul id="tech-list">{displayAttacks()}</ul>
      <AttackDetails attackId={attackId} />
    </div>
  );
};

export default graphql(getAttacksQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.attackId
      }
    }
  }
})(TechniqueList);
