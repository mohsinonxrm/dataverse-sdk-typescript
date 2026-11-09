import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_invokeCustomAgentForCaseProcessingAgent action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_invokeCustomAgentForCaseProcessingAgentResponse = void;

/**
 * Parameters of the msdyn_invokeCustomAgentForCaseProcessingAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_invokeCustomAgentForCaseProcessingAgentActionParameters {
  msdyn_customAgentDetails: string;
  msdyn_caseProcessingAgentDetails: string;
  RunId?: string;
}

/**
 * msdyn_invokeCustomAgentForCaseProcessingAgent action
 *
 * Unbound action
 */
export class msdyn_invokeCustomAgentForCaseProcessingAgentAction implements Executable<msdyn_invokeCustomAgentForCaseProcessingAgentResponse> {
  constructor(
    public readonly parameters: msdyn_invokeCustomAgentForCaseProcessingAgentActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_invokeCustomAgentForCaseProcessingAgent`;

    const body = requestBody({
      msdyn_customAgentDetails: this.parameters.msdyn_customAgentDetails,
      msdyn_caseProcessingAgentDetails: this.parameters.msdyn_caseProcessingAgentDetails,
      RunId: this.parameters.RunId,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_invokeCustomAgentForCaseProcessingAgentResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
