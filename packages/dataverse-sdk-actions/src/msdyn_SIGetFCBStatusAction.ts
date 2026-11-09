import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SIGetFCBStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SIGetFCBStatusResponse {
  "@odata.context"?: string;
  Status: boolean;
}

/**
 * Parameters of the msdyn_SIGetFCBStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SIGetFCBStatusActionParameters {
  FCBName: string;
}

/**
 * msdyn_SIGetFCBStatus action
 *
 * Unbound action
 */
export class msdyn_SIGetFCBStatusAction implements Executable<msdyn_SIGetFCBStatusResponse> {
  constructor(public readonly parameters: msdyn_SIGetFCBStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SIGetFCBStatus`;

    const body = requestBody({
      FCBName: this.parameters.FCBName,
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

  async parseResponse(response: Response): Promise<msdyn_SIGetFCBStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SIGetFCBStatusResponse;
  }
}
