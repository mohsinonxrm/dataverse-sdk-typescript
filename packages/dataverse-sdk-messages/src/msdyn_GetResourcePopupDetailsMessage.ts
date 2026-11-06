import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetResourcePopupDetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourcePopupDetailsRequestParameters {
  StartDate?: string;
  EndDate?: string;
  ResourceId: string;
}

/**
 * msdyn_GetResourcePopupDetails request message
 *
 * Web API Action: msdyn_GetResourcePopupDetails
 */
export class msdyn_GetResourcePopupDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourcePopupDetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetResourcePopupDetailsRequestParameters>;

  constructor(parameters: msdyn_GetResourcePopupDetailsRequestParameters) {
    super("msdyn_GetResourcePopupDetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourcePopupDetails`;

    const body = requestBody({
      StartDate: this.Parameters.StartDate,
      EndDate: this.Parameters.EndDate,
      ResourceId: this.Parameters.ResourceId,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourcePopupDetailsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetResourcePopupDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetResourcePopupDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourcePopupDetailsResult {
  "@odata.context"?: string;
  ResourceDetails: string;
}

/**
 * msdyn_GetResourcePopupDetails response message
 *
 * `result` is the value the msdyn_GetResourcePopupDetails action returns (see {@link msdyn_GetResourcePopupDetailsResult}).
 */
export class msdyn_GetResourcePopupDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourcePopupDetailsResult) {
    super("msdyn_GetResourcePopupDetails");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetResourcePopupDetailsResponse {
    return new msdyn_GetResourcePopupDetailsResponse(data as msdyn_GetResourcePopupDetailsResult);
  }
}
