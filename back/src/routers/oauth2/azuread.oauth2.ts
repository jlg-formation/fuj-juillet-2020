import got from 'got';
import {User} from '../../interfaces/User';

export const getAzureADUserInfo = async (
  access_token: string
): Promise<User> => {
  const data = await got
    .get('https://graph.microsoft.com/v1.0/me', {
      headers: {
        // Include the token in the Authorization header
        Authorization: 'Bearer ' + access_token,
      },
    })
    .json<{displayName: string; userPrincipalName: string; surname: string}>();
  console.log('azure ad data: ', data);
  const user = {
    displayName: data.displayName,
    email: data.userPrincipalName,
    id: data.surname,
    resourceServer: 'azure AD',
  };
  console.log('user: ', user);
  return user;
};
