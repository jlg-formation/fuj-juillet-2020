import got from 'got';

export const getUserInfo = async (access_token: string) => {
  const user = await got
    .get('https://api.github.com/user', {
      headers: {
        // This header informs the Github API about the API version
        Accept: 'application/vnd.github.v3+json',
        // Include the token in the Authorization header
        Authorization: 'token ' + access_token,
      },
    })
    .json<{name: string; email: string; login: string}>();
  console.log('user: ', user);
  return user;
};
