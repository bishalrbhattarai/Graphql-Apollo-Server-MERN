import { useQuery, gql } from "@apollo/client";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      title
      completed
      user {
        email
        phone
      }
    }
  }
`;
function App() {
  const { data, loading } = useQuery(query);
  if (loading) return <h1>Loading....</h1>;
  return (
    <>
      {data &&
        data.getTodos.map((item) => (
          <>
            {" "}
            <h1>{item.title}</h1>
          </>
        ))}{" "}
    </>
  );
}

export default App;
