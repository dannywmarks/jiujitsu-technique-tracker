import TechList from "./components/TechniqueList/TechniqueList";
import AddTechnique from "./components/AddAttack/AddAttack";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { AppContainer } from "./components/Container/Container.style";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Jiu-jitsu Technique List</h1>
        <TechList />
        <AddTechnique />
      </div>
    </ApolloProvider>
  );
}

export default App;
