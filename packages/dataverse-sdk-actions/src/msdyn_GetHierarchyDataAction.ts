import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetHierarchyData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetHierarchyDataResponse {
  "@odata.context"?: string;
  output: string;
}

/**
 * Parameters of the msdyn_GetHierarchyData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetHierarchyDataActionParameters {
  input: string;
}

/**
 * msdyn_GetHierarchyData action
 *
 * Unbound action
 */
export class msdyn_GetHierarchyDataAction implements Executable<msdyn_GetHierarchyDataResponse> {
  constructor(public readonly parameters: msdyn_GetHierarchyDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetHierarchyData`;

    const body = requestBody({
      input: this.parameters.input,
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

  async parseResponse(response: Response): Promise<msdyn_GetHierarchyDataResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetHierarchyDataResponse;
  }
}
