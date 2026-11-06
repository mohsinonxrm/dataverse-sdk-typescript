import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SIGetFCBStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SIGetFCBStatusRequestParameters {
  FCBName: string;
}

/**
 * msdyn_SIGetFCBStatus request message
 *
 * Web API Action: msdyn_SIGetFCBStatus
 */
export class msdyn_SIGetFCBStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SIGetFCBStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SIGetFCBStatusRequestParameters>;

  constructor(parameters: msdyn_SIGetFCBStatusRequestParameters) {
    super("msdyn_SIGetFCBStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SIGetFCBStatus`;

    const body = requestBody({
      FCBName: this.Parameters.FCBName,
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

  async parseResponse(response: Response): Promise<msdyn_SIGetFCBStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SIGetFCBStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SIGetFCBStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SIGetFCBStatusResult {
  "@odata.context"?: string;
  Status: boolean;
}

/**
 * msdyn_SIGetFCBStatus response message
 *
 * `result` is the value the msdyn_SIGetFCBStatus action returns (see {@link msdyn_SIGetFCBStatusResult}).
 */
export class msdyn_SIGetFCBStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SIGetFCBStatusResult) {
    super("msdyn_SIGetFCBStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SIGetFCBStatusResponse {
    return new msdyn_SIGetFCBStatusResponse(data as msdyn_SIGetFCBStatusResult);
  }
}
