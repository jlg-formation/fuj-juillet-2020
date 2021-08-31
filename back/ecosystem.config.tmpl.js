module.exports = {
  apps: [
    {
      name: 'Wiame API Node Server',
      script: 'build/src/index.js',
      env: {
        WIAME_NODESERVER_PORT: 3050,
      },
      env_production: {},
    },
  ],
};
