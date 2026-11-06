import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult action
 */
export interface msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse {
  msdyn_Response: string;
}

/**
 * msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultAction implements Executable<msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse> {
  constructor(
    public readonly msdyn_RegardingObjectId: EntityReference | AnyEntityPayload,
    public readonly msdyn_TrackingId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult`;

    const body: Record<string, unknown> = {
      msdyn_RegardingObjectId: this.msdyn_RegardingObjectId,
      msdyn_TrackingId: this.msdyn_TrackingId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse> {
    const data = await response.json();
    return data as msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse;
  }
}
