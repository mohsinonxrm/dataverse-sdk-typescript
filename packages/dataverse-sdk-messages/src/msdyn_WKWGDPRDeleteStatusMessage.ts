import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_WKWGDPRDeleteStatusResponse as msdyn_WKWGDPRDeleteStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_WKWGDPRDeleteStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_WKWGDPRDeleteStatusRequestParameters {
  UserIds: string[];
}

/**
 * msdyn_WKWGDPRDeleteStatus request message
 *
 * Web API Action: msdyn_WKWGDPRDeleteStatus
 */
export class msdyn_WKWGDPRDeleteStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_WKWGDPRDeleteStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_WKWGDPRDeleteStatusRequestParameters>;

  constructor(parameters: msdyn_WKWGDPRDeleteStatusRequestParameters) {
    super("msdyn_WKWGDPRDeleteStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WKWGDPRDeleteStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_WKWGDPRDeleteStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_WKWGDPRDeleteStatusResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_WKWGDPRDeleteStatus response message
 */
export class msdyn_WKWGDPRDeleteStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_WKWGDPRDeleteStatusResponseData) {
    super("msdyn_WKWGDPRDeleteStatus");
  }

  static fromResponse(data: unknown): msdyn_WKWGDPRDeleteStatusResponse {
    return new msdyn_WKWGDPRDeleteStatusResponse(
      responseObject<msdyn_WKWGDPRDeleteStatusResponseData>(data)
    );
  }
}
