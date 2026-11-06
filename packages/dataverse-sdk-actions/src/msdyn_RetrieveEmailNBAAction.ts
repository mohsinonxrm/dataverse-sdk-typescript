import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrieveEmailNBA action
 */
export interface msdyn_RetrieveEmailNBAResponse {
  msdyn_result: string;
}

/**
 * Parameters of the msdyn_RetrieveEmailNBA action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveEmailNBAActionParameters {
  msdyn_RegardingEntityIds: string;
  msdyn_RegardingLogicalName: string;
}

/**
 * msdyn_RetrieveEmailNBA action
 *
 * Unbound action
 */
export class msdyn_RetrieveEmailNBAAction implements Executable<msdyn_RetrieveEmailNBAResponse> {
  constructor(public readonly parameters: msdyn_RetrieveEmailNBAActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEmailNBA`;

    const body = requestBody({
      msdyn_RegardingEntityIds: this.parameters.msdyn_RegardingEntityIds,
      msdyn_RegardingLogicalName: this.parameters.msdyn_RegardingLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveEmailNBAResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RetrieveEmailNBAResponse;
  }
}
