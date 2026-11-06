import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForFailingWorkflowRelatedToAgreementResponse as msdyn_CheckForFailingWorkflowRelatedToAgreementResponseData } from "./types/index.js";

/**
 * msdyn_CheckForFailingWorkflowRelatedToAgreement request message
 *
 * Web API Action: msdyn_CheckForFailingWorkflowRelatedToAgreement
 */
export class msdyn_CheckForFailingWorkflowRelatedToAgreementRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForFailingWorkflowRelatedToAgreementResponse>
{
  constructor() {
    super("msdyn_CheckForFailingWorkflowRelatedToAgreement");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForFailingWorkflowRelatedToAgreement`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckForFailingWorkflowRelatedToAgreementResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckForFailingWorkflowRelatedToAgreementResponse.fromResponse({});
    return msdyn_CheckForFailingWorkflowRelatedToAgreementResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_CheckForFailingWorkflowRelatedToAgreement response message
 */
export class msdyn_CheckForFailingWorkflowRelatedToAgreementResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForFailingWorkflowRelatedToAgreementResponseData) {
    super("msdyn_CheckForFailingWorkflowRelatedToAgreement");
  }

  static fromResponse(data: unknown): msdyn_CheckForFailingWorkflowRelatedToAgreementResponse {
    return new msdyn_CheckForFailingWorkflowRelatedToAgreementResponse(
      responseObject<msdyn_CheckForFailingWorkflowRelatedToAgreementResponseData>(data)
    );
  }
}
