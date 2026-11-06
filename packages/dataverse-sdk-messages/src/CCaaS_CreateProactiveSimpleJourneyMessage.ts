import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_CreateProactiveSimpleJourney message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateProactiveSimpleJourneyRequestParameters {
  ProactiveEngagementConfigId: string;
  ApiVersion: string;
  ContactsFileId: string;
}

/**
 * CCaaS_CreateProactiveSimpleJourney request message
 *
 * Web API Action: CCaaS_CreateProactiveSimpleJourney
 */
export class CCaaS_CreateProactiveSimpleJourneyRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CreateProactiveSimpleJourneyResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CreateProactiveSimpleJourneyRequestParameters>;

  constructor(parameters: CCaaS_CreateProactiveSimpleJourneyRequestParameters) {
    super("CCaaS_CreateProactiveSimpleJourney", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateProactiveSimpleJourney`;

    const body = requestBody({
      ProactiveEngagementConfigId: this.Parameters.ProactiveEngagementConfigId,
      ApiVersion: this.Parameters.ApiVersion,
      ContactsFileId: this.Parameters.ContactsFileId,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateProactiveSimpleJourneyResponse> {
    // No return value (204 No Content)
    return new CCaaS_CreateProactiveSimpleJourneyResponse();
  }
}

/**
 * CCaaS_CreateProactiveSimpleJourney response message
 */
export class CCaaS_CreateProactiveSimpleJourneyResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_CreateProactiveSimpleJourney");
  }

  static fromResponse(_data: unknown): CCaaS_CreateProactiveSimpleJourneyResponse {
    return new CCaaS_CreateProactiveSimpleJourneyResponse();
  }
}
