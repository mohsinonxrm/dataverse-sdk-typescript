import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SetCaseSentimentCustomAPI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetCaseSentimentCustomAPIRequestParameters {
  emailId: string;
}

/**
 * msdyn_SetCaseSentimentCustomAPI request message
 *
 * Web API Action: msdyn_SetCaseSentimentCustomAPI
 */
export class msdyn_SetCaseSentimentCustomAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetCaseSentimentCustomAPIResponse>
{
  declare readonly Parameters: Readonly<msdyn_SetCaseSentimentCustomAPIRequestParameters>;

  constructor(parameters: msdyn_SetCaseSentimentCustomAPIRequestParameters) {
    super("msdyn_SetCaseSentimentCustomAPI", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetCaseSentimentCustomAPI`;

    const body = requestBody({
      emailId: this.Parameters.emailId,
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
