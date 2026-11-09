import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_WKWGDPRDeleteStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_WKWGDPRDeleteStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WKWGDPRDeleteStatusResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_WKWGDPRDeleteStatus response message
 *
 * `result` is the value the msdyn_WKWGDPRDeleteStatus action returns (see {@link msdyn_WKWGDPRDeleteStatusResult}).
 */
export class msdyn_WKWGDPRDeleteStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_WKWGDPRDeleteStatusResult) {
    super("msdyn_WKWGDPRDeleteStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_WKWGDPRDeleteStatusResponse {
    return new msdyn_WKWGDPRDeleteStatusResponse(data as msdyn_WKWGDPRDeleteStatusResult);
  }
}
