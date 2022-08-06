import axios, { AxiosInstance } from "axios";

export class AxiosClient {
  private static client: AxiosInstance;

  private constructor() {}

  public static getClient() {
    if (!AxiosClient.client) {
      AxiosClient.client = axios.create();
    }

    return AxiosClient.client;
  }
}
