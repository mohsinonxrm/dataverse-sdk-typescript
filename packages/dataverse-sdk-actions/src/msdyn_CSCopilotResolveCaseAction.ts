import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_CSCopilotResolveCase action
 */
export interface msdyn_CSCopilotResolveCaseResponse {
  StatusCode: number;
  CaseStatusReason: number;
  Message: string;
}

/**
 * Parameters of the msdyn_CSCopilotResolveCase action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CSCopilotResolveCaseActionParameters {
  Incident: EntityReference | AnyEntityPayload;
  ResolutionReason: number;
  CallerIdentifier: string;
  StatusReason: number;
}

/**
 * msdyn_CSCopilotResolveCase action
 *
 * Unbound action
 */
export class msdyn_CSCopilotResolveCaseAction implements Executable<msdyn_CSCopilotResolveCaseResponse> {
  constructor(public readonly parameters: msdyn_CSCopilotResolveCaseActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCopilotResolveCase`;

    const body = requestBody({
      Incident: this.parameters.Incident,
      ResolutionReason: this.parameters.ResolutionReason,
      CallerIdentifier: this.parameters.CallerIdentifier,
      StatusReason: this.parameters.StatusReason,
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

  async parseResponse(response: Response): Promise<msdyn_CSCopilotResolveCaseResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CSCopilotResolveCaseResponse;
    return (await response.json()) as msdyn_CSCopilotResolveCaseResponse;
  }
}
