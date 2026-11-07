import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CreateSuggestedActivity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateSuggestedActivityRequestParameters {
  SuggestedActivityId: string;
  RegardingObjectId: string;
  RegardingObjectEntity: string;
  IsAdminConsented?: boolean;
}

/**
 * msdyn_CreateSuggestedActivity request message
 *
 * Web API Action: msdyn_CreateSuggestedActivity
 */
export class msdyn_CreateSuggestedActivityRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateSuggestedActivityResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateSuggestedActivityRequestParameters>;

  constructor(parameters: msdyn_CreateSuggestedActivityRequestParameters) {
    super("msdyn_CreateSuggestedActivity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSuggestedActivity`;

    const body = requestBody({
      SuggestedActivityId: this.Parameters.SuggestedActivityId,
      RegardingObjectId: this.Parameters.RegardingObjectId,
      RegardingObjectEntity: this.Parameters.RegardingObjectEntity,
      IsAdminConsented: this.Parameters.IsAdminConsented,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSuggestedActivityResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CreateSuggestedActivityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateSuggestedActivity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateSuggestedActivityResult {
  "@odata.context"?: string;
  failedRecordCount: string;
  id: string;
}

/**
 * msdyn_CreateSuggestedActivity response message
 *
 * `result` is the value the msdyn_CreateSuggestedActivity action returns (see {@link msdyn_CreateSuggestedActivityResult}).
 */
export class msdyn_CreateSuggestedActivityResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateSuggestedActivityResult) {
    super("msdyn_CreateSuggestedActivity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateSuggestedActivityResponse {
    return new msdyn_CreateSuggestedActivityResponse(data as msdyn_CreateSuggestedActivityResult);
  }
}
