import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_SendMCSSurvey message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SendMCSSurveyRequestParameters {
  From: EntityReference | AnyEntityPayload;
  To: Record<string, unknown>[];
  Cc?: Record<string, unknown>[];
  Bcc?: Record<string, unknown>[];
  Regarding: EntityReference | AnyEntityPayload;
  Template?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SendMCSSurvey request message
 *
 * Web API Action: msdyn_SendMCSSurvey
 */
export class msdyn_SendMCSSurveyRequest
  extends OrganizationRequest
  implements Executable<msdyn_SendMCSSurveyResponse>
{
  declare readonly Parameters: Readonly<msdyn_SendMCSSurveyRequestParameters>;

  constructor(parameters: msdyn_SendMCSSurveyRequestParameters) {
    super("msdyn_SendMCSSurvey", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendMCSSurvey`;

    const body = requestBody({
      From: this.Parameters.From,
      To: this.Parameters.To,
      Cc: this.Parameters.Cc,
      Bcc: this.Parameters.Bcc,
      Regarding: this.Parameters.Regarding,
      Template: this.Parameters.Template,
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

  parseResponse(_response: Response): Promise<msdyn_SendMCSSurveyResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_SendMCSSurveyResponse());
  }
}

/**
 * msdyn_SendMCSSurvey response message
 */
export class msdyn_SendMCSSurveyResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SendMCSSurvey");
  }

  static fromResponse(_data?: unknown): msdyn_SendMCSSurveyResponse {
    return new msdyn_SendMCSSurveyResponse();
  }
}
