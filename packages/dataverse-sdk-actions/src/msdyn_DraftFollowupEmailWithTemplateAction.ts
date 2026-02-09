import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DraftFollowupEmailWithTemplate action
 */
export interface msdyn_DraftFollowupEmailWithTemplateResponse {
  DraftedFollowupEmail: string;
}

/**
 * msdyn_DraftFollowupEmailWithTemplate action
 *
 * Unbound action
 */
export class msdyn_DraftFollowupEmailWithTemplateAction implements Executable<msdyn_DraftFollowupEmailWithTemplateResponse> {
  constructor(
    public readonly agentMonitoringId: string,
    public readonly incidentEntityName: string,
    public readonly templateId: string,
    public readonly incidentId: string,
    public readonly agentActivityId: string,
    public readonly emailAssistInput: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DraftFollowupEmailWithTemplate`;

    const body: Record<string, unknown> = {
      AgentMonitoringId: this.agentMonitoringId,
      IncidentEntityName: this.incidentEntityName,
      TemplateId: this.templateId,
      IncidentId: this.incidentId,
      AgentActivityId: this.agentActivityId,
      EmailAssistInput: this.emailAssistInput,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DraftFollowupEmailWithTemplateResponse> {
    const data = await response.json();
    return data as msdyn_DraftFollowupEmailWithTemplateResponse;
  }
}
