import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdynmkt_consentprovidervalidate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_consentprovidervalidateResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_consentprovidervalidateResponse;
  }
}
