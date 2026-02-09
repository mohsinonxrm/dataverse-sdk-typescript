import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_conversationclosecasesentiment request message
 *
 * Web API Action: msdyn_conversationclosecasesentiment
 */
export class msdyn_conversationclosecasesentimentRequest
  extends OrganizationRequest
  implements Executable<msdyn_conversationclosecasesentimentResponse>
{
  constructor(public liveWorkItemGuid: string) {
    super("msdyn_conversationclosecasesentiment");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_conversationclosecasesentiment`;

    const body: Record<string, unknown> = {
      LiveWorkItemGuid: this.liveWorkItemGuid,
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

  async parseResponse(response: Response): Promise<msdyn_conversationclosecasesentimentResponse> {
    // No return value (204 No Content)
    return new msdyn_conversationclosecasesentimentResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      LiveWorkItemGuid: this.liveWorkItemGuid,
    };
  }
}

/**
 * msdyn_conversationclosecasesentiment response message
 */
export class msdyn_conversationclosecasesentimentResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_conversationclosecasesentiment");
  }

  static fromResponse(_data: unknown): msdyn_conversationclosecasesentimentResponse {
    return new msdyn_conversationclosecasesentimentResponse();
  }
}
