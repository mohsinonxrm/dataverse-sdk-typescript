import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_PollODOSForExtractions request message
 *
 * Web API Action: msdyn_PollODOSForExtractions
 */
export class msdyn_PollODOSForExtractionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_PollODOSForExtractionsResponse>
{
  constructor(public inputData: string) {
    super("msdyn_PollODOSForExtractions");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PollODOSForExtractions`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_PollODOSForExtractionsResponse> {
    // No return value (204 No Content)
    return new msdyn_PollODOSForExtractionsResponse();
  }
}

/**
 * msdyn_PollODOSForExtractions response message
 */
export class msdyn_PollODOSForExtractionsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_PollODOSForExtractions");
  }

  static fromResponse(_data: unknown): msdyn_PollODOSForExtractionsResponse {
    return new msdyn_PollODOSForExtractionsResponse();
  }
}
