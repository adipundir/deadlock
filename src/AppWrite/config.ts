"use server"
import { NextRequest } from "next/server";
import { Client, Account, Storage } from "node-appwrite";

const project_endpoint = process.env.PUBLIC_APPWRITE_ENDPOINT;
const project_id = process.env.PUBLIC_APPWRITE_PROJECT;
const auth_admin_key = process.env.AUTH_ADMIN_KEY;
const storage_admin_key = process.env.STORAGE_ADMIN_KEY

const createAuthAdminClient = async () => {
    const client = new Client()
      .setEndpoint(project_endpoint!)
      .setProject(project_id!)
      .setKey(auth_admin_key!)

    return {
      get account() {
        return new Account(client);
      },
    };
}
const createSessionClientOnRequest = async (request : NextRequest) => {
    const client = new Client()
      .setEndpoint(project_endpoint!)
      .setProject(project_id!)

    const session = request.cookies.get("session");

      if(session){
        client.setSession(session.value)
      }

    return {
      get account() {
        return new Account(client);
      },
    };
}
const createSessionClientOnDemand = async (secret : string) => {
    const client = new Client()
      .setEndpoint(project_endpoint!)
      .setProject(project_id!)
      .setSession(secret)

    return {
      get account() {
        return new Account(client);
      },
    };
}

const createStorageAdminClient = async () => {
  const client = new Client()
    .setEndpoint(project_endpoint!)
    .setProject(project_id!)
    .setKey(storage_admin_key!);

  return {
    get storage() {
      return new Storage(client);
    },
  };
};

const createStorageClientOnRequest = async (request: NextRequest) => {
  const client = new Client()
    .setEndpoint(project_endpoint!)
    .setProject(project_id!);

  const session = request.cookies.get("session");

  if (session) {
    client.setSession(session.value);
  }

  return {
    get storage() {
      return new Storage(client);
    },
  };
};

export {
  createAuthAdminClient,
  createSessionClientOnDemand,
  createSessionClientOnRequest,
  createStorageClientOnRequest,
  createStorageAdminClient,
};

