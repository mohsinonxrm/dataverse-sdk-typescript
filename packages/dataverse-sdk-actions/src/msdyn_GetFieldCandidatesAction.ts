import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetFieldCandidates action
 */
export interface msdyn_GetFieldCandidatesResponse {
  msdyn_aidescriptioncandidates: string;
}

/**
 * Parameters of the msdyn_GetFieldCandidates action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFieldCandidatesActionParameters {
  msdyn_FetchFailed?: boolean;
  msdyn_CorrelationId?: string;
  msdyn_RunId: string;
  msdyn_PublishedMode?: boolean;
}

/**
 * msdyn_GetFieldCandidates action
 *
 * Unbound action
 */
export class msdyn_GetFieldCandidatesAction implements Executable<msdyn_GetFieldCandidatesResponse> {
  constructor(public readonly parameters: msdyn_GetFieldCandidatesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFieldCandidates`;

    const body = requestBody({
      msdyn_FetchFailed: this.parameters.msdyn_FetchFailed,
      msdyn_CorrelationId: this.parameters.msdyn_CorrelationId,
      msdyn_RunId: this.parameters.msdyn_RunId,
      msdyn_PublishedMode: this.parameters.msdyn_PublishedMode,
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

  async parseResponse(response: Response): Promise<msdyn_GetFieldCandidatesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetFieldCandidatesResponse;
    return (await response.json()) as msdyn_GetFieldCandidatesResponse;
  }
}
