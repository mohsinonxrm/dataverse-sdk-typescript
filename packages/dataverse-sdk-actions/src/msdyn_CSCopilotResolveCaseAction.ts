import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
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
 * msdyn_CSCopilotResolveCase action
 *
 * Unbound action
 */
export class msdyn_CSCopilotResolveCaseAction implements Executable<msdyn_CSCopilotResolveCaseResponse> {
  constructor(
    public readonly incident: EntityReference | AnyEntityPayload,
    public readonly resolutionReason: number,
    public readonly callerIdentifier: string,
    public readonly statusReason: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCopilotResolveCase`;

    const body: Record<string, unknown> = {
      Incident: this.incident,
      ResolutionReason: this.resolutionReason,
      CallerIdentifier: this.callerIdentifier,
      StatusReason: this.statusReason,
    };

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
    const data = await response.json();
    return data as msdyn_CSCopilotResolveCaseResponse;
  }
}
