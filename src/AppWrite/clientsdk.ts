import { Account, Client } from "appwrite";
const project_endpoint = process.env.PUBLIC_APPWRITE_ENDPOINT;
const project_id = process.env.PUBLIC_APPWRITE_PROJECT;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66584558003bb9c3916d"); 

const account = new Account(client);

export {account}

