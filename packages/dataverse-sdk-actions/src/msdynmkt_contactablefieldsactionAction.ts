import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_contactablefieldsaction action
 */
export interface msdynmkt_contactablefieldsactionResponse {
  msdynmkt_contactablefieldsresponse: string;
}

/**
 * Parameters of the msdynmkt_contactablefieldsaction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_contactablefieldsactionActionParameters {
  msdynmkt_contactpointtypes: string;
  msdynmkt_entitytypes: string;
}

/**
 * msdynmkt_contactablefieldsaction action
 *
 * Unbound action
 */
export class msdynmkt_contactablefieldsactionAction implements Executable<msdynmkt_contactablefieldsactionResponse> {
  constructor(public readonly parameters: msdynmkt_contactablefieldsactionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_contactablefieldsaction`;

    const body = requestBody({
      msdynmkt_contactpointtypes: this.parameters.msdynmkt_contactpointtypes,
      msdynmkt_entitytypes: this.parameters.msdynmkt_entitytypes,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_contactablefieldsactionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_contactablefieldsactionResponse;
    return (await response.json()) as msdynmkt_contactablefieldsactionResponse;
  }
}
