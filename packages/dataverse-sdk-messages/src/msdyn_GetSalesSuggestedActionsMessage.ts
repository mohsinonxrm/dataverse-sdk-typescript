import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSalesSuggestedActions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesSuggestedActionsRequestParameters {
  ClientContext?: string;
  OtherData?: string;
}

/**
 * msdyn_GetSalesSuggestedActions request message
 *
 * Web API Action: msdyn_GetSalesSuggestedActions
 */
export class msdyn_GetSalesSuggestedActionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesSuggestedActionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSalesSuggestedActionsRequestParameters>;

  constructor(parameters: msdyn_GetSalesSuggestedActionsRequestParameters = {}) {
    super("msdyn_GetSalesSuggestedActions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesSuggestedActions`;

    const body = requestBody({
      ClientContext: this.Parameters.ClientContext,
      OtherData: this.Parameters.OtherData,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesSuggestedActionsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSalesSuggestedActionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSalesSuggestedActions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesSuggestedActionsResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_GetSalesSuggestedActions response message
 *
 * `result` is the value the msdyn_GetSalesSuggestedActions action returns (see {@link msdyn_GetSalesSuggestedActionsResult}).
 */
export class msdyn_GetSalesSuggestedActionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesSuggestedActionsResult) {
    super("msdyn_GetSalesSuggestedActions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSalesSuggestedActionsResponse {
    return new msdyn_GetSalesSuggestedActionsResponse(data as msdyn_GetSalesSuggestedActionsResult);
  }
}
