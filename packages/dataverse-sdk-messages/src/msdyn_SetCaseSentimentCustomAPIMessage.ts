import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SetCaseSentimentCustomAPI request message
 *
 * Web API Action: msdyn_SetCaseSentimentCustomAPI
 */
export class msdyn_SetCaseSentimentCustomAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetCaseSentimentCustomAPIResponse>
{
  constructor(public emailId: string) {
    super("msdyn_SetCaseSentimentCustomAPI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetCaseSentimentCustomAPI`;

    const body: Record<string, unknown> = {
      emailId: this.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_SetCaseSentimentCustomAPIResponse> {
    // No return value (204 No Content)
    return new msdyn_SetCaseSentimentCustomAPIResponse();
  }
}

/**
 * msdyn_SetCaseSentimentCustomAPI response message
 */
export class msdyn_SetCaseSentimentCustomAPIResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SetCaseSentimentCustomAPI");
  }

  static fromResponse(_data: unknown): msdyn_SetCaseSentimentCustomAPIResponse {
    return new msdyn_SetCaseSentimentCustomAPIResponse();
  }
}
