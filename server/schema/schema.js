const graphql = require("graphql");
const _ = require("lodash");
const Attack = require("../models/attack");
const Position = require("../models/position");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// dummy data
// var positions = [
//   { id: "1", name: "mount" },
//   { id: "2", name: "side-control" },
//   { id: "3", name: "north-south" },
//   { id: "4", name: "half-guard" },
//   { id: "5", name: "guard" },
// ];

// var attacks = [
//   { id: "1", name: "arm-lock", positionId: "2", link: "http://youtube.com" },
//   { id: "2", name: "leg-lock", positionId: "2", link: "http://youtube.com" },
//   { id: "3", name: "sweep", positionId: "2", link: "http://youtube.com" },
//   { id: "4", name: "choke", positionId: "2", link: "http://youtube.com" },
// ];

const PositionType = new GraphQLObjectType({
  name: "Position",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    attacks: {
      type: new GraphQLList(AttackType),
      resolve(parent, args) {
        // return _.filter(attacks, { positionId: parent.id });
        return Attack.find({ positionId: parent.id });
      },
    },
  }),
});

const AttackType = new GraphQLObjectType({
  name: "Attack",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    link: { type: GraphQLString },
    position: {
      type: AttackType,
      resolve(parent, args) {
        console.log(parent);
        // return _.find(positions, { id: parent.positionId });
        return Position.findById(parent.positionId);
      },
    },
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
        // return _.find(positions, { id: args.id });
        return Position.findById(args.id);
      },
    },
    attack: {
      type: AttackType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db
        // return _.find(attacks, { id: args.id });
        return Attack.findById(args.id);
      },
    },
    positions: {
      type: new GraphQLList(PositionType),
      resolve(parent, args) {
        // return positions
        return Position.find({});
      },
    },
    attacks: {
      type: new GraphQLList(AttackType),
      resolve(parent, args) {
        // return attacks
        return Attack.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAttack: {
      type: AttackType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        link: {
          type: new GraphQLNonNull(GraphQLString),
        },
        positionId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        let attack = new Attack({
          name: args.name,
          link: args.link,
          positionId: args.positionId,
        });
        return attack.save();
      },
    },
    addPosition: {
      type: PositionType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        let attack = new Position({
          name: args.name,
        });
        return attack.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// jiujitsu;
// positions;
// attacks - sweeps, armlocks, leglocks, chokes;
