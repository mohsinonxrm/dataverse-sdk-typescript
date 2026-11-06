import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetLeadCallPrepSheetDetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetLeadCallPrepSheetDetailsRequestParameters {
  msdyn_leadid: string;
}

/**
 * msdyn_GetLeadCallPrepSheetDetails request message
 *
 * Web API Action: msdyn_GetLeadCallPrepSheetDetails
 */
export class msdyn_GetLeadCallPrepSheetDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLeadCallPrepSheetDetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetLeadCallPrepSheetDetailsRequestParameters>;

  constructor(parameters: msdyn_GetLeadCallPrepSheetDetailsRequestParameters) {
    super("msdyn_GetLeadCallPrepSheetDetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLeadCallPrepSheetDetails`;

    const body = requestBody({
      msdyn_leadid: this.Parameters.msdyn_leadid,
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

  async parseResponse(response: Response): Promise<msdyn_GetLeadCallPrepSheetDetailsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetLeadCallPrepSheetDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetLeadCallPrepSheetDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetLeadCallPrepSheetDetailsResult {
  "@odata.context"?: string;
  msdyn_label: string;
  msdyn_url: string;
}

/**
 * msdyn_GetLeadCallPrepSheetDetails response message
 *
 * `result` is the value the msdyn_GetLeadCallPrepSheetDetails action returns (see {@link msdyn_GetLeadCallPrepSheetDetailsResult}).
 */
export class msdyn_GetLeadCallPrepSheetDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetLeadCallPrepSheetDetailsResult) {
    super("msdyn_GetLeadCallPrepSheetDetails");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetLeadCallPrepSheetDetailsResponse {
    return new msdyn_GetLeadCallPrepSheetDetailsResponse(
      data as msdyn_GetLeadCallPrepSheetDetailsResult
    );
  }
}
