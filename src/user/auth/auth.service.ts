import { AuthResult } from "./auth.model";

interface AuthMock extends AuthResult {
  password: string;
}

const users: AuthMock[] = [
  {
    name: 'Administrator',
    username: 'admin',
    password: '123456',
    roles: ['admin'],
  }
];

export const AuthService = {

  login(username: string, password: string) {
    return new Promise<AuthResult>(
      (resolve, reject) => 
        setTimeout(
          () => {
            const user = users.find(user => user.username === username && user.password === password)
            if (user) resolve({ name: user.name, username: user.username, roles: user.roles })
            else reject({ status: 403, message: 'Incorrect username or password' })
          },
          200
        )
    )
  }

}