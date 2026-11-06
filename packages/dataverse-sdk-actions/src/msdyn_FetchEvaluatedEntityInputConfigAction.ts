import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FetchEvaluatedEntityInputConfig action
 */
export interface msdyn_FetchEvaluatedEntityInputConfigResponse {
  entity_data: string;
}

/**
 * Parameters of the msdyn_FetchEvaluatedEntityInputConfig action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchEvaluatedEntityInputConfigActionParameters {
  regardingEntityId: string;
  regardingEntityLogicalName: string;
}

/**
 * msdyn_FetchEvaluatedEntityInputConfig action
 *
 * Unbound action
 */
export class msdyn_FetchEvaluatedEntityInputConfigAction implements Executable<msdyn_FetchEvaluatedEntityInputConfigResponse> {
  constructor(public readonly parameters: msdyn_FetchEvaluatedEntityInputConfigActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchEvaluatedEntityInputConfig`;

    const body = requestBody({
      regardingEntityId: this.parameters.regardingEntityId,
      regardingEntityLogicalName: this.parameters.regardingEntityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_FetchEvaluatedEntityInputConfigResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_FetchEvaluatedEntityInputConfigResponse;
    return (await response.json()) as msdyn_FetchEvaluatedEntityInputConfigResponse;
  }
}
