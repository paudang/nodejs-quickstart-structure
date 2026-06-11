import request from 'supertest';

const SERVER_URL = process.env.TEST_URL || `http://127.0.0.1:${process.env.PORT || 3001}`;

describe('E2E User Tests', () => {
  let userId: string;
  const uniqueEmail = `test_${Date.now()}@example.com`;

  it('should create a user via GraphQL', async () => {
    const query = `
      mutation {
        createUser(name: "Test User", email: "${uniqueEmail}") {
          id
          name
          email
        }
      }
    `;
    const response = await request(SERVER_URL)
      .post('/graphql')
      .send({ query });

    expect(response.statusCode).toBe(200);
    expect(response.body.errors).toBeUndefined();
    userId = response.body.data.createUser.id;
    expect(userId).toBeDefined();
  });

  it('should fetch all users via GraphQL', async () => {
    const query = `{ getAllUsers { id name email } }`;
    const response = await request(SERVER_URL)
      .post('/graphql')
      .send({ query });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data.getAllUsers)).toBe(true);
    const user = response.body.data.getAllUsers.find((u: any) => u.id === userId);
    expect(user).toBeDefined();
  });

  it('should update a user via GraphQL', async () => {
    const query = `
      mutation {
        updateUser(id: "${userId}", name: "Updated User") {
          id
          name
        }
      }
    `;
    const response = await request(SERVER_URL)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({ query });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.updateUser.name).toBe("Updated User");
  });

  it('should delete a user via GraphQL', async () => {
    const query = `
      mutation {
        deleteUser(id: "${userId}")
      }
    `;
    const response = await request(SERVER_URL)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({ query });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.deleteUser).toBe(true);
  });
});
