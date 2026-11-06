import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetMultipleResourceBookingDetailsAndSummaries message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMultipleResourceBookingDetailsAndSummariesRequestParameters {
  Input?: string;
}

/**
 * msdyn_GetMultipleResourceBookingDetailsAndSummaries request message
 *
 * Web API Action: msdyn_GetMultipleResourceBookingDetailsAndSummaries
 */
export class msdyn_GetMultipleResourceBookingDetailsAndSummariesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetMultipleResourceBookingDetailsAndSummariesRequestParameters>;

  constructor(
    parameters: msdyn_GetMultipleResourceBookingDetailsAndSummariesRequestParameters = {}
  ) {
    super("msdyn_GetMultipleResourceBookingDetailsAndSummaries", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMultipleResourceBookingDetailsAndSummaries`;

    const body = requestBody({
      Input: this.Parameters.Input,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_GetMultipleResourceBookingDetailsAndSummaries action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetMultipleResourceBookingDetailsAndSummariesResult {
  "@odata.context"?: string;
  Output: string;
}

/**
 * msdyn_GetMultipleResourceBookingDetailsAndSummaries response message
 *
 * `result` is the value the msdyn_GetMultipleResourceBookingDetailsAndSummaries action returns (see {@link msdyn_GetMultipleResourceBookingDetailsAndSummariesResult}).
 */
export class msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMultipleResourceBookingDetailsAndSummariesResult) {
    super("msdyn_GetMultipleResourceBookingDetailsAndSummaries");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse {
    return new msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse(
      data as msdyn_GetMultipleResourceBookingDetailsAndSummariesResult
    );
  }
}
