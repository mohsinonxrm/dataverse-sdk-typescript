import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement action
 */
export interface msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementActionParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement action
 *
 * Unbound action
 */
export class msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementAction implements Executable<msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse> {
  constructor(
    public readonly parameters: msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
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
      return {} as msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse;
    return (await response.json()) as msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse;
  }
}
