import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_DraftFollowupEmailWithTemplateResponse as msdyn_DraftFollowupEmailWithTemplateResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_DraftFollowupEmailWithTemplate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DraftFollowupEmailWithTemplateRequestParameters {
  AgentMonitoringId: string;
  IncidentEntityName: string;
  TemplateId: string;
  IncidentId: string;
  AgentActivityId: string;
  EmailAssistInput: string;
}

/**
 * msdyn_DraftFollowupEmailWithTemplate request message
 *
 * Web API Action: msdyn_DraftFollowupEmailWithTemplate
 */
export class msdyn_DraftFollowupEmailWithTemplateRequest
  extends OrganizationRequest
  implements Executable<msdyn_DraftFollowupEmailWithTemplateResponse>
{
  declare readonly Parameters: Readonly<msdyn_DraftFollowupEmailWithTemplateRequestParameters>;

  constructor(parameters: msdyn_DraftFollowupEmailWithTemplateRequestParameters) {
    super("msdyn_DraftFollowupEmailWithTemplate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DraftFollowupEmailWithTemplate`;

    const body = requestBody({
      AgentMonitoringId: this.Parameters.AgentMonitoringId,
      IncidentEntityName: this.Parameters.IncidentEntityName,
      TemplateId: this.Parameters.TemplateId,
      IncidentId: this.Parameters.IncidentId,
      AgentActivityId: this.Parameters.AgentActivityId,
      EmailAssistInput: this.Parameters.EmailAssistInput,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_DraftFollowupEmailWithTemplateResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_DraftFollowupEmailWithTemplate response message
 */
export class msdyn_DraftFollowupEmailWithTemplateResponse extends OrganizationResponse {
  constructor(public result: msdyn_DraftFollowupEmailWithTemplateResponseData) {
    super("msdyn_DraftFollowupEmailWithTemplate");
  }

  static fromResponse(data: unknown): msdyn_DraftFollowupEmailWithTemplateResponse {
    return new msdyn_DraftFollowupEmailWithTemplateResponse(
      responseObject<msdyn_DraftFollowupEmailWithTemplateResponseData>(data)
    );
  }
}
