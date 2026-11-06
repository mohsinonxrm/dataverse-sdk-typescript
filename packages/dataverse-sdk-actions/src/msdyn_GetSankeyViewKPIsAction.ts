import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetSankeyViewKPIs action
 */
export interface msdyn_GetSankeyViewKPIsResponse {
  SankeyViewKPIs: string;
}

/**
 * Parameters of the msdyn_GetSankeyViewKPIs action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSankeyViewKPIsActionParameters {
  ActionIds: string;
  SequenceId: string;
  RegardingEntityName: string;
}

/**
 * msdyn_GetSankeyViewKPIs action
 *
 * Unbound action
 */
export class msdyn_GetSankeyViewKPIsAction implements Executable<msdyn_GetSankeyViewKPIsResponse> {
  constructor(public readonly parameters: msdyn_GetSankeyViewKPIsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSankeyViewKPIs`;

    const body = requestBody({
      ActionIds: this.parameters.ActionIds,
      SequenceId: this.parameters.SequenceId,
      RegardingEntityName: this.parameters.RegardingEntityName,
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

  async parseResponse(response: Response): Promise<msdyn_GetSankeyViewKPIsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetSankeyViewKPIsResponse;
  }
}
