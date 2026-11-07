import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DismissSuggestedActivity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DismissSuggestedActivityRequestParameters {
  SuggestedActivityId: string;
  DismissActivity: boolean;
}

/**
 * msdyn_DismissSuggestedActivity request message
 *
 * Web API Action: msdyn_DismissSuggestedActivity
 */
export class msdyn_DismissSuggestedActivityRequest
  extends OrganizationRequest
  implements Executable<msdyn_DismissSuggestedActivityResponse>
{
  declare readonly Parameters: Readonly<msdyn_DismissSuggestedActivityRequestParameters>;

  constructor(parameters: msdyn_DismissSuggestedActivityRequestParameters) {
    super("msdyn_DismissSuggestedActivity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DismissSuggestedActivity`;

    const body = requestBody({
      SuggestedActivityId: this.Parameters.SuggestedActivityId,
      DismissActivity: this.Parameters.DismissActivity,
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

  parseResponse(_response: Response): Promise<msdyn_DismissSuggestedActivityResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_DismissSuggestedActivityResponse());
  }
}

/**
 * msdyn_DismissSuggestedActivity response message
 */
export class msdyn_DismissSuggestedActivityResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_DismissSuggestedActivity");
  }

  static fromResponse(_data?: unknown): msdyn_DismissSuggestedActivityResponse {
    return new msdyn_DismissSuggestedActivityResponse();
  }
}
