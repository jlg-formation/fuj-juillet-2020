import got from 'got';
import {User} from '../../interfaces/User';

export const getAzureADUserInfo = async (
  access_token: string
): Promise<User> => {
  const data = await got
    .get('https://graph.microsoft.com/v1.0/me', {
      headers: {
        // This header informs the Github API about the API version
        Accept: 'application/vnd.github.v3+json',
        // Include the token in the Authorization header
        Authorization: 'Bearer ' + access_token,
      },
    })
    .json<{name: string; email: string; login: string}>();
  console.log('azure ad data: ', data);
  const user = {
    displayName: data.name,
    email: data.email,
    id: data.login,
    resourceServer: 'github',
  };
  console.log('user: ', user);
  return user;
};
