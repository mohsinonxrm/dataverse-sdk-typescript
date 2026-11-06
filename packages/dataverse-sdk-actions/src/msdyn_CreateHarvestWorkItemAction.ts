import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateHarvestWorkItem action
 */
export interface msdyn_CreateHarvestWorkItemResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateHarvestWorkItemResponse;
    return (await response.json()) as msdyn_CreateHarvestWorkItemResponse;
  }
}
