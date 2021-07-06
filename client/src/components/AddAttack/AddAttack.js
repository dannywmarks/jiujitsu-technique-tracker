import { useState } from "react";
import { graphql} from "react-apollo";
import { getPositionsQuery, getAttacksQuery, addAttackMutation } from "../../queries/queries";
import {flowRight as compose} from 'lodash';
import { Button } from '../Button/Button.style'



const AddAttack = (props) => {
  let initialState = {
    technique: "",
    link: "",
    positionId: undefined,
  };
  const [formData, setFormData] = useState(initialState);

 
  const displayPositions = () => {
    var data = props.getPositionsQuery;
   
    return data.loading ? (
      <option disabled>loading positions...</option>
    ) : (
      data.positions.map((position) => {
        return (
          <option key={position.id} value={position.id}>
            {position.name}
          </option>
        ); 
      })
    );
  };

// Function handles the data submited from the form
  const handleSubmit = (e) => {
    const { technique, link, positionId } = formData;
    e.preventDefault();
    props.addAttackMutation({
      variables: {
        name: technique,
        link: link,
        positionId: positionId
      }, 
      // fetches query and re renders component
      refetchQueries: [{ query: getAttacksQuery }]
      
      })
    setFormData(formData)
    console.log(formData)
    clear();
  };

// Function clears fields initializing state to default
  const clear = () => {
    console.log("clear data");
    setFormData(initialState);
  };

// Function for on change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((e) => ({ ...e, [name]: value }));
    
  };

  const { technique, link, positionId } = formData;

  return (
    <div>
      <form id="add-technique" onSubmit={handleSubmit}>
        <div className="field">
          <label>Technique:</label>
          <input
            label="Technique"
            name="technique"
            type="text"
            value={technique}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Link:</label>
          <input
            label="Link"
            name="link"
            type="text"
            value={link}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Position:</label>
          <select name="positionId" onChange={handleChange} value={positionId}>
            <option>Select position</option>
            {displayPositions()}
          </select>
        </div>

        {/* <Button backgroundColor="blue">Add Technique</Button> */}
        <button class="">+</button>
      </form>
    </div>
  );
};

export default compose(
  graphql(getPositionsQuery, {name: "getPositionsQuery"}),
  graphql(addAttackMutation, {name: "addAttackMutation"})
)(AddAttack);
