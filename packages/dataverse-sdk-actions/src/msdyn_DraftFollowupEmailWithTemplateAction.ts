import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DraftFollowupEmailWithTemplate action
 */
export interface msdyn_DraftFollowupEmailWithTemplateResponse {
  DraftedFollowupEmail: string;
}

/**
 * Parameters of the msdyn_DraftFollowupEmailWithTemplate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DraftFollowupEmailWithTemplateActionParameters {
  AgentMonitoringId: string;
  IncidentEntityName: string;
  TemplateId: string;
  IncidentId: string;
  AgentActivityId: string;
  EmailAssistInput: string;
}

/**
 * msdyn_DraftFollowupEmailWithTemplate action
 *
 * Unbound action
 */
export class msdyn_DraftFollowupEmailWithTemplateAction implements Executable<msdyn_DraftFollowupEmailWithTemplateResponse> {
  constructor(public readonly parameters: msdyn_DraftFollowupEmailWithTemplateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DraftFollowupEmailWithTemplate`;

    const body = requestBody({
      AgentMonitoringId: this.parameters.AgentMonitoringId,
      IncidentEntityName: this.parameters.IncidentEntityName,
      TemplateId: this.parameters.TemplateId,
      IncidentId: this.parameters.IncidentId,
      AgentActivityId: this.parameters.AgentActivityId,
      EmailAssistInput: this.parameters.EmailAssistInput,
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

  async parseResponse(response: Response): Promise<msdyn_DraftFollowupEmailWithTemplateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_DraftFollowupEmailWithTemplateResponse;
    return (await response.json()) as msdyn_DraftFollowupEmailWithTemplateResponse;
  }
}
