import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_DoesKBExist action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DoesKBExistResponse {
  "@odata.context"?: string;
  Response: string;
  usage: string;
}

/**
 * Parameters of the msdyn_DoesKBExist action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DoesKBExistActionParameters {
  HarvestWorkItemResponse: string;
  CSCopilotRequest: string;
}

/**
 * msdyn_DoesKBExist action
 *
 * Unbound action
 */
export class msdyn_DoesKBExistAction implements Executable<msdyn_DoesKBExistResponse> {
  constructor(public readonly parameters: msdyn_DoesKBExistActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DoesKBExist`;

    const body = requestBody({
      HarvestWorkItemResponse: this.parameters.HarvestWorkItemResponse,
      CSCopilotRequest: this.parameters.CSCopilotRequest,
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

  async parseResponse(response: Response): Promise<msdyn_DoesKBExistResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_DoesKBExistResponse;
  }
}
