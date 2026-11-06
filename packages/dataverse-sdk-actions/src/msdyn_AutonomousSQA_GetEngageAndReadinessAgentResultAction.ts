import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult action
 */
export interface msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse {
  msdyn_Response: string;
}

/**
 * Parameters of the msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultActionParameters {
  msdyn_RegardingObjectId: EntityReference | AnyEntityPayload;
  msdyn_TrackingId: string;
}

/**
 * msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultAction implements Executable<msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse> {
  constructor(
    public readonly parameters: msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult`;

    const body = requestBody({
      msdyn_RegardingObjectId: this.parameters.msdyn_RegardingObjectId,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse;
  }
}
