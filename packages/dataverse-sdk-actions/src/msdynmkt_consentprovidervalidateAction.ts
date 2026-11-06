import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdynmkt_consentprovidervalidate action
 */
export interface msdynmkt_consentprovidervalidateResponse {
  issuccess: boolean;
  message: string;
}

/**
 * Parameters of the msdynmkt_consentprovidervalidate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_consentprovidervalidateActionParameters {
  consentprovider: EntityReference | AnyEntityPayload;
}

/**
 * msdynmkt_consentprovidervalidate action
 *
 * Unbound action
 */
export class msdynmkt_consentprovidervalidateAction implements Executable<msdynmkt_consentprovidervalidateResponse> {
  constructor(public readonly parameters: msdynmkt_consentprovidervalidateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_consentprovidervalidate`;

    const body = requestBody({
      consentprovider: this.parameters.consentprovider,
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

  async parseResponse(response: Response): Promise<msdynmkt_consentprovidervalidateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_consentprovidervalidateResponse;
    return (await response.json()) as msdynmkt_consentprovidervalidateResponse;
  }
}
