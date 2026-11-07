import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSalesMeetings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesMeetingsRequestParameters {
  msdyn_to: string;
  msdyn_from: string;
}

/**
 * msdyn_GetSalesMeetings request message
 *
 * Web API Action: msdyn_GetSalesMeetings
 */
export class msdyn_GetSalesMeetingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesMeetingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSalesMeetingsRequestParameters>;

  constructor(parameters: msdyn_GetSalesMeetingsRequestParameters) {
    super("msdyn_GetSalesMeetings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesMeetings`;

    const body = requestBody({
      msdyn_to: this.Parameters.msdyn_to,
      msdyn_from: this.Parameters.msdyn_from,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesMeetingsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSalesMeetingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSalesMeetings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesMeetingsResult {
  "@odata.context"?: string;
  msdyn_error: string;
  msdyn_result: string;
  msdyn_status: number;
}

/**
 * msdyn_GetSalesMeetings response message
 *
 * `result` is the value the msdyn_GetSalesMeetings action returns (see {@link msdyn_GetSalesMeetingsResult}).
 */
export class msdyn_GetSalesMeetingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesMeetingsResult) {
    super("msdyn_GetSalesMeetings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSalesMeetingsResponse {
    return new msdyn_GetSalesMeetingsResponse(data as msdyn_GetSalesMeetingsResult);
  }
}
