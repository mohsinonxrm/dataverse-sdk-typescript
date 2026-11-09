import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the cascadeAsync_SuccessAPI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface cascadeAsync_SuccessAPIRequestParameters {
  casadeAsync_JobName: string;
}

/**
 * cascadeAsync_SuccessAPI request message
 *
 * Web API Action: cascadeAsync_SuccessAPI
 */
export class cascadeAsync_SuccessAPIRequest
  extends OrganizationRequest
  implements Executable<cascadeAsync_SuccessAPIResponse>
{
  declare readonly Parameters: Readonly<cascadeAsync_SuccessAPIRequestParameters>;

  constructor(parameters: cascadeAsync_SuccessAPIRequestParameters) {
    super("cascadeAsync_SuccessAPI", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/cascadeAsync_SuccessAPI`;

    const body = requestBody({
      casadeAsync_JobName: this.Parameters.casadeAsync_JobName,
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

  parseResponse(_response: Response): Promise<cascadeAsync_SuccessAPIResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new cascadeAsync_SuccessAPIResponse());
  }
}

/**
 * cascadeAsync_SuccessAPI response message
 */
export class cascadeAsync_SuccessAPIResponse extends OrganizationResponse {
  constructor() {
    super("cascadeAsync_SuccessAPI");
  }

  static fromResponse(_data?: unknown): cascadeAsync_SuccessAPIResponse {
    return new cascadeAsync_SuccessAPIResponse();
  }
}
