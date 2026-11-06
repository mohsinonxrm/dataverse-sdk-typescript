import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_PollODOSForExtractions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PollODOSForExtractionsRequestParameters {
  InputData: string;
}

/**
 * msdyn_PollODOSForExtractions request message
 *
 * Web API Action: msdyn_PollODOSForExtractions
 */
export class msdyn_PollODOSForExtractionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_PollODOSForExtractionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_PollODOSForExtractionsRequestParameters>;

  constructor(parameters: msdyn_PollODOSForExtractionsRequestParameters) {
    super("msdyn_PollODOSForExtractions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PollODOSForExtractions`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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
