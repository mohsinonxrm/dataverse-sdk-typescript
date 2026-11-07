import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultRequestParameters {
  msdyn_RegardingObjectId: EntityReference | AnyEntityPayload;
  msdyn_TrackingId: string;
}

/**
 * msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult request message
 *
 * Web API Action: msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult
 */
export class msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse>
{
  declare readonly Parameters: Readonly<msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultRequestParameters>;

  constructor(parameters: msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultRequestParameters) {
    super("msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult`;

    const body = requestBody({
      msdyn_RegardingObjectId: this.Parameters.msdyn_RegardingObjectId,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
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
    // The body is the complex value, with its @odata.context
    return msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResult {
  "@odata.context"?: string;
  msdyn_Response: string;
}

/**
 * msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult response message
 *
 * `result` is the value the msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult action returns (see {@link msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResult}).
 */
export class msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResult) {
    super("msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse {
    return new msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse(
      data as msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResult
    );
  }
}
