import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetRICommonFCBStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRICommonFCBStatusRequestParameters {
  FCBName: string;
}

/**
 * msdyn_GetRICommonFCBStatus request message
 *
 * Web API Action: msdyn_GetRICommonFCBStatus
 */
export class msdyn_GetRICommonFCBStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRICommonFCBStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetRICommonFCBStatusRequestParameters>;

  constructor(parameters: msdyn_GetRICommonFCBStatusRequestParameters) {
    super("msdyn_GetRICommonFCBStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRICommonFCBStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_GetRICommonFCBStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetRICommonFCBStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetRICommonFCBStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRICommonFCBStatusResult {
  "@odata.context"?: string;
  Status: boolean;
}

/**
 * msdyn_GetRICommonFCBStatus response message
 *
 * `result` is the value the msdyn_GetRICommonFCBStatus action returns (see {@link msdyn_GetRICommonFCBStatusResult}).
 */
export class msdyn_GetRICommonFCBStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRICommonFCBStatusResult) {
    super("msdyn_GetRICommonFCBStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetRICommonFCBStatusResponse {
    return new msdyn_GetRICommonFCBStatusResponse(data as msdyn_GetRICommonFCBStatusResult);
  }
}
