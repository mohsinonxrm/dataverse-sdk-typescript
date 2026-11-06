import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CreateHarvestWorkItem action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateHarvestWorkItemResponse {
  "@odata.context"?: string;
  Response6: string;
  usage: string;
}

/**
 * Parameters of the msdyn_CreateHarvestWorkItem action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateHarvestWorkItemActionParameters {
  CSCopilotRequest5: string;
}

/**
 * msdyn_CreateHarvestWorkItem action
 *
 * Unbound action
 */
export class msdyn_CreateHarvestWorkItemAction implements Executable<msdyn_CreateHarvestWorkItemResponse> {
  constructor(public readonly parameters: msdyn_CreateHarvestWorkItemActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateHarvestWorkItem`;

    const body = requestBody({
      CSCopilotRequest5: this.parameters.CSCopilotRequest5,
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

  async parseResponse(response: Response): Promise<msdyn_CreateHarvestWorkItemResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CreateHarvestWorkItemResponse;
  }
}
