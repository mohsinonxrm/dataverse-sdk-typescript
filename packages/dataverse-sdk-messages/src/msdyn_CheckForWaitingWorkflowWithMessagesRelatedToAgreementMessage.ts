import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse as msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementRequestParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement request message
 *
 * Web API Action: msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement
 */
export class msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementRequestParameters>;

  constructor(
    parameters: msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementRequestParameters
  ) {
    super("msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
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
  ): Promise<msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse.fromResponse({});
    return msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement response message
 */
export class msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponseData
  ) {
    super("msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse {
    return new msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse(
      responseObject<msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponseData>(data)
    );
  }
}
