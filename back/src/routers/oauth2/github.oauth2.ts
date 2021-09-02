import got from 'got';
import {User} from '../../interfaces/User';

export const getUserInfo = async (access_token: string): Promise<User> => {
  const data = await got
    .get('https://api.github.com/user', {
      headers: {
        // This header informs the Github API about the API version
        Accept: 'application/vnd.github.v3+json',
        // Include the token in the Authorization header
        Authorization: 'token ' + access_token,
      },
    })
    .json<{name: string; email: string; login: string}>();
  const user = {
    displayName: data.name,
    email: data.email,
    id: data.login,
    resourceServer: 'github',
  };
  console.log('user: ', user);
  return user;
};
