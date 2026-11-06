import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetHierarchyData action
 */
export interface msdyn_GetHierarchyDataResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetHierarchyDataResponse;
  }
}
