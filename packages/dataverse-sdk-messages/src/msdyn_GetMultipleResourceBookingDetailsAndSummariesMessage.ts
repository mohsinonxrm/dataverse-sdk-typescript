import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse as msdyn_GetMultipleResourceBookingDetailsAndSummariesResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse.fromResponse({});
    return msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_GetMultipleResourceBookingDetailsAndSummaries response message
 */
export class msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMultipleResourceBookingDetailsAndSummariesResponseData) {
    super("msdyn_GetMultipleResourceBookingDetailsAndSummaries");
  }

  static fromResponse(data: unknown): msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse {
    return new msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse(
      responseObject<msdyn_GetMultipleResourceBookingDetailsAndSummariesResponseData>(data)
    );
  }
}
