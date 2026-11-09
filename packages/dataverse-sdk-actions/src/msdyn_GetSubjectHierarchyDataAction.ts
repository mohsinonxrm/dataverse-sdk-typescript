import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetSubjectHierarchyData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSubjectHierarchyDataResponse {
  "@odata.context"?: string;
  output: string;
}

/**
 * Parameters of the msdyn_GetSubjectHierarchyData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSubjectHierarchyDataActionParameters {
  input: string;
}

/**
 * msdyn_GetSubjectHierarchyData action
 *
 * Unbound action
 */
export class msdyn_GetSubjectHierarchyDataAction implements Executable<msdyn_GetSubjectHierarchyDataResponse> {
  constructor(public readonly parameters: msdyn_GetSubjectHierarchyDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSubjectHierarchyData`;

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

  async parseResponse(response: Response): Promise<msdyn_GetSubjectHierarchyDataResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSubjectHierarchyDataResponse;
  }
}
