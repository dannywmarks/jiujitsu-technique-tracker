const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

// dummy data
var positions = [
  { id: "1", name: "mount" },
  { id: "2", name: "side-control" },
  { id: "3", name: "north-south" },
  { id: "4", name: "half-guard" },
  { id: "5", name: "guard" },
];

var attacks = [
  { id: "1", name: "arm-lock" },
  { id: "2", name: "leg-lock" },
  { id: "3", name: "sweep" },
  { id: "4", name: "choke" },
];

const PositionType = new GraphQLObjectType({
  name: "Position",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const AttackType = new GraphQLObjectType({
  name: "Attack",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    position: {
      type: PositionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db
        return _.find(positions, { id: args.id });
      },
    },
    attack: {
      type: AttackType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db
        return _.find(attacks, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

// jiujitsu;
// positions;
// attacks - sweeps, armlocks, leglocks, chokes;
