const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');

const users = [{ id: 1, username: 'bro', age: 12 }];

const app = express();

app.use(cors());

const createUser = (input) => {
  const id = Date.now();
  return { id, ...input };
};

const rootValue = {
  getAllUsers: () => users,
  getUser: ({ id }) => users.find((user) => user.id === id),
  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
};

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue,
}));

app.listen(8080, () => { console.log('server has starsted on port 8080'); });
