import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetOCSharedServiceURI request message
 *
 * Web API Action: msdyn_GetOCSharedServiceURI
 */
export class msdyn_GetOCSharedServiceURIRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOCSharedServiceURIResponse>
{
  constructor() {
    super("msdyn_GetOCSharedServiceURI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOCSharedServiceURI`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetOCSharedServiceURIResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetOCSharedServiceURIResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetOCSharedServiceURI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOCSharedServiceURIResult {
  "@odata.context"?: string;
  SharedServiceURI: string;
}

/**
 * msdyn_GetOCSharedServiceURI response message
 *
 * `result` is the value the msdyn_GetOCSharedServiceURI action returns (see {@link msdyn_GetOCSharedServiceURIResult}).
 */
export class msdyn_GetOCSharedServiceURIResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOCSharedServiceURIResult) {
    super("msdyn_GetOCSharedServiceURI");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetOCSharedServiceURIResponse {
    return new msdyn_GetOCSharedServiceURIResponse(data as msdyn_GetOCSharedServiceURIResult);
  }
}
