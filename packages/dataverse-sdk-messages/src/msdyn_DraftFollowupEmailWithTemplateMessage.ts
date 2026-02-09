import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DraftFollowupEmailWithTemplate request message
 *
 * Web API Action: msdyn_DraftFollowupEmailWithTemplate
 */
export class msdyn_DraftFollowupEmailWithTemplateRequest
  extends OrganizationRequest
  implements Executable<msdyn_DraftFollowupEmailWithTemplateResponse>
{
  constructor(
    public agentMonitoringId: string,
    public incidentEntityName: string,
    public templateId: string,
    public incidentId: string,
    public agentActivityId: string,
    public emailAssistInput: string
  ) {
    super("msdyn_DraftFollowupEmailWithTemplate");
  }

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
    return msdyn_DraftFollowupEmailWithTemplateResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AgentMonitoringId: this.agentMonitoringId,
      IncidentEntityName: this.incidentEntityName,
      TemplateId: this.templateId,
      IncidentId: this.incidentId,
      AgentActivityId: this.agentActivityId,
      EmailAssistInput: this.emailAssistInput,
    };
  }
}

/**
 * msdyn_DraftFollowupEmailWithTemplate response message
 */
export class msdyn_DraftFollowupEmailWithTemplateResponse extends OrganizationResponse {
  constructor(public result: msdyn_DraftFollowupEmailWithTemplateResponse) {
    super("msdyn_DraftFollowupEmailWithTemplate");
  }

  static fromResponse(data: unknown): msdyn_DraftFollowupEmailWithTemplateResponse {
    return new msdyn_DraftFollowupEmailWithTemplateResponse((data as any).value);
  }
}
