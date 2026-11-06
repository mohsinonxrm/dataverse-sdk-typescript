import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from GetRunMap action
 */
export interface GetRunMapResponse {
  continuationToken: string;
  runMap: string;
}

/**
 * Parameters of the GetRunMap action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetRunMapActionParameters {
  runId: string;
  continuationToken?: string;
  max?: number;
}

/**
 * GetRunMap action
 *
 * Bound action
 * Binding parameter: entity (mscrm.businessprocess)
 *
 * The first argument is the id of the businessprocess record to call it on.
 */
export class GetRunMapAction implements Executable<GetRunMapResponse> {
  constructor(
    public readonly businessprocessId: string,
    public readonly parameters: GetRunMapActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/businessprocesses(${this.businessprocessId})/Microsoft.Dynamics.CRM.GetRunMap`;

    const body = requestBody({
      runId: this.parameters.runId,
      continuationToken: this.parameters.continuationToken,
      max: this.parameters.max,
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

  async parseResponse(response: Response): Promise<GetRunMapResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as GetRunMapResponse;
  }
}
