import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse as msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponseData } from "./types/index.js";

/**
 * msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult request message
 *
 * Web API Action: msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult
 */
export class msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse>
{
  constructor(
    public msdyn_RegardingObjectId: EntityReference,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult");
  }

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
    return msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse.fromResponse(data);
  }
}

/**
 * msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult response message
 */
export class msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponseData) {
    super("msdyn_AutonomousSQA_GetEngageAndReadinessAgentResult");
  }

  static fromResponse(data: unknown): msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse {
    return new msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse(
      responseObject<msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponseData>(data)
    );
  }
}
