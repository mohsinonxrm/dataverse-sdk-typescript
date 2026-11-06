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
  AgentActivityId: string;
  IncidentId: string;
  TemplateId: string;
  AgentMonitoringId: string;
  EmailAssistInput: string;
  IncidentEntityName: string;
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
      AgentActivityId: this.parameters.AgentActivityId,
      IncidentId: this.parameters.IncidentId,
      TemplateId: this.parameters.TemplateId,
      AgentMonitoringId: this.parameters.AgentMonitoringId,
      EmailAssistInput: this.parameters.EmailAssistInput,
      IncidentEntityName: this.parameters.IncidentEntityName,
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
