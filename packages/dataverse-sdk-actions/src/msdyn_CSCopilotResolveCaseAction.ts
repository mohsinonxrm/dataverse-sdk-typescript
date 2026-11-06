import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_CSCopilotResolveCase action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CSCopilotResolveCaseResponse {
  "@odata.context"?: string;
  CaseStatusReason: number;
  Message: string;
  StatusCode: number;
}

/**
 * Parameters of the msdyn_CSCopilotResolveCase action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CSCopilotResolveCaseActionParameters {
  ResolutionReason: number;
  StatusReason: number;
  Incident: EntityReference | AnyEntityPayload;
  CallerIdentifier: string;
  PredictedValues?: EntityReference | AnyEntityPayload;
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
      ResolutionReason: this.parameters.ResolutionReason,
      StatusReason: this.parameters.StatusReason,
      Incident: this.parameters.Incident,
      CallerIdentifier: this.parameters.CallerIdentifier,
      PredictedValues: this.parameters.PredictedValues,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CSCopilotResolveCaseResponse;
  }
}
