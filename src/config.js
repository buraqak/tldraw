const nodeEnv = process.env.NODE_ENV;

const clientId = process.env.REACT_APP_CLIENT_ID;
if (!clientId) console.log("Missing REACT_APP_CLIENT_ID");

const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
if (!clientSecret) console.log("Missing REACT_APP_CLIENT_SECRET");

const apiUrl = process.env.REACT_APP_AUTH_URL;
if (!apiUrl) console.log("Missing REACT_APP_AUTH_URL");

const awsAccessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
if (!awsAccessKeyId) console.log("Missing REACT_APP_AUTH_URL");

const awsSecretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
if (!awsSecretAccessKey) console.log("Missing REACT_APP_AUTH_URL");

const awsDefaultResgion = process.env.REACT_APP_AWS_DEFAULT_REGION;
if (!awsDefaultResgion) console.log("Missing AWS_DEFAULT_REGION");

// Enable CORS in for localhost only
const localCorsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
};

export {
  nodeEnv,
  clientId,
  clientSecret,
  apiUrl,
  localCorsHeaders,
  awsAccessKeyId,
  awsSecretAccessKey,
  awsDefaultResgion,
};
