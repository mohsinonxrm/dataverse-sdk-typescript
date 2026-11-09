import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_DraftFollowupEmailWithTemplateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_DraftFollowupEmailWithTemplate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DraftFollowupEmailWithTemplateResult {
  "@odata.context"?: string;
  DraftedFollowupEmail: string;
}

/**
 * msdyn_DraftFollowupEmailWithTemplate response message
 *
 * `result` is the value the msdyn_DraftFollowupEmailWithTemplate action returns (see {@link msdyn_DraftFollowupEmailWithTemplateResult}).
 */
export class msdyn_DraftFollowupEmailWithTemplateResponse extends OrganizationResponse {
  constructor(public result: msdyn_DraftFollowupEmailWithTemplateResult) {
    super("msdyn_DraftFollowupEmailWithTemplate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_DraftFollowupEmailWithTemplateResponse {
    return new msdyn_DraftFollowupEmailWithTemplateResponse(
      data as msdyn_DraftFollowupEmailWithTemplateResult
    );
  }
}
