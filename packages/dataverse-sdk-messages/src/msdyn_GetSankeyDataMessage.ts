import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSankeyData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSankeyDataRequestParameters {
  msdyn_sequenceid: string;
  msdyn_datefrom: string;
  msdyn_dateto: string;
}

/**
 * msdyn_GetSankeyData request message
 *
 * Web API Action: msdyn_GetSankeyData
 */
export class msdyn_GetSankeyDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSankeyDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSankeyDataRequestParameters>;

  constructor(parameters: msdyn_GetSankeyDataRequestParameters) {
    super("msdyn_GetSankeyData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSankeyData`;

    const body = requestBody({
      msdyn_sequenceid: this.Parameters.msdyn_sequenceid,
      msdyn_datefrom: this.Parameters.msdyn_datefrom,
      msdyn_dateto: this.Parameters.msdyn_dateto,
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

  async parseResponse(response: Response): Promise<msdyn_GetSankeyDataResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSankeyDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSankeyData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSankeyDataResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_GetSankeyData response message
 *
 * `result` is the value the msdyn_GetSankeyData action returns (see {@link msdyn_GetSankeyDataResult}).
 */
export class msdyn_GetSankeyDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSankeyDataResult) {
    super("msdyn_GetSankeyData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSankeyDataResponse {
    return new msdyn_GetSankeyDataResponse(data as msdyn_GetSankeyDataResult);
  }
}
