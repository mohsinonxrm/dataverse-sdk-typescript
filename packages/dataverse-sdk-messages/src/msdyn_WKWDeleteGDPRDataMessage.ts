import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_WKWDeleteGDPRData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_WKWDeleteGDPRDataRequestParameters {
  UserIds: string[];
}

/**
 * msdyn_WKWDeleteGDPRData request message
 *
 * Web API Action: msdyn_WKWDeleteGDPRData
 */
export class msdyn_WKWDeleteGDPRDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_WKWDeleteGDPRDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_WKWDeleteGDPRDataRequestParameters>;

  constructor(parameters: msdyn_WKWDeleteGDPRDataRequestParameters) {
    super("msdyn_WKWDeleteGDPRData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WKWDeleteGDPRData`;

    const body = requestBody({
      UserIds: this.Parameters.UserIds,
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

  parseResponse(_response: Response): Promise<msdyn_WKWDeleteGDPRDataResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_WKWDeleteGDPRDataResponse());
  }
}

/**
 * msdyn_WKWDeleteGDPRData response message
 */
export class msdyn_WKWDeleteGDPRDataResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_WKWDeleteGDPRData");
  }

  static fromResponse(_data?: unknown): msdyn_WKWDeleteGDPRDataResponse {
    return new msdyn_WKWDeleteGDPRDataResponse();
  }
}
