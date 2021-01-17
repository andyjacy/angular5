// Configuration for GitHub Application
export const gatekeeperConfig = {
  development: {
    client_id: 'acf515591243786851f3', // your Client ID from GitHub
    redirect_uri: 'http://localhost:4200/auth', // authentication url
    gatekeeper: 'http://localhost:9999' // url from gatekeeper
  },
  production: {
    // add your production configuration here
  }
};
