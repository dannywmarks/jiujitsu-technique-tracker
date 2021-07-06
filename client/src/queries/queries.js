import { gql } from "apollo-boost";


export const getAttacksQuery = gql`
  {
    attacks {
      name
      id
    }
  }
`;

export const getPositionsQuery = gql`
  {
    positions {
      name
      id
    }
  }
`;

export const addAttackMutation = gql`
mutation($name: String!, $link: String! $positionId: ID!){
  addAttack(name: $name, link: $link, positionId: $positionId){
    name
    id
  }
}
`


export const getAttackQuery = gql`
query($id:ID!){
  attack(id: $id){
    id
    name
    link
    position{
      name
    }
  }
}
`