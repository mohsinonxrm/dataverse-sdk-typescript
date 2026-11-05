import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DismissSuggestedActivity request message
 *
 * Web API Action: msdyn_DismissSuggestedActivity
 */
export class msdyn_DismissSuggestedActivityRequest
  extends OrganizationRequest
  implements Executable<msdyn_DismissSuggestedActivityResponse>
{
  constructor(
    public suggestedActivityId: string,
    public dismissActivity: boolean
  ) {
    super("msdyn_DismissSuggestedActivity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DismissSuggestedActivity`;

    const body: Record<string, unknown> = {
      SuggestedActivityId: this.suggestedActivityId,
      DismissActivity: this.dismissActivity,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DismissSuggestedActivityResponse> {
    // No return value (204 No Content)
    return new msdyn_DismissSuggestedActivityResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SuggestedActivityId: this.suggestedActivityId,
      DismissActivity: this.dismissActivity,
    };
  }
}

/**
 * msdyn_DismissSuggestedActivity response message
 */
export class msdyn_DismissSuggestedActivityResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_DismissSuggestedActivity");
  }

  static fromResponse(_data: unknown): msdyn_DismissSuggestedActivityResponse {
    return new msdyn_DismissSuggestedActivityResponse();
  }
}
