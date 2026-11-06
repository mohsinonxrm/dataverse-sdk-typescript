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
  AgentActivityId: string;
  IncidentId: string;
  TemplateId: string;
  AgentMonitoringId: string;
  EmailAssistInput: string;
  IncidentEntityName: string;
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
      AgentActivityId: this.Parameters.AgentActivityId,
      IncidentId: this.Parameters.IncidentId,
      TemplateId: this.Parameters.TemplateId,
      AgentMonitoringId: this.Parameters.AgentMonitoringId,
      EmailAssistInput: this.Parameters.EmailAssistInput,
      IncidentEntityName: this.Parameters.IncidentEntityName,
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
    if (response.status === 204)
      return msdyn_DraftFollowupEmailWithTemplateResponse.fromResponse({});
    return msdyn_DraftFollowupEmailWithTemplateResponse.fromResponse(await response.json());
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
