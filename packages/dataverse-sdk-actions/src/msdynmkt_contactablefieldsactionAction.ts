import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_contactablefieldsaction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_contactablefieldsactionResponse {
  "@odata.context"?: string;
  msdynmkt_contactablefieldsresponse: string;
}

/**
 * Parameters of the msdynmkt_contactablefieldsaction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_contactablefieldsactionActionParameters {
  msdynmkt_entitytypes: string;
  msdynmkt_contactpointtypes: string;
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
      msdynmkt_entitytypes: this.parameters.msdynmkt_entitytypes,
      msdynmkt_contactpointtypes: this.parameters.msdynmkt_contactpointtypes,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_contactablefieldsactionResponse;
  }
}
