import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ProductDeterminationAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProductDeterminationActionRequestParameters {
  SearchIteration: string;
  RequestPayload: string;
}

/**
 * msdyn_ProductDeterminationAction request message
 *
 * Web API Action: msdyn_ProductDeterminationAction
 */
export class msdyn_ProductDeterminationActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProductDeterminationActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_ProductDeterminationActionRequestParameters>;

  constructor(parameters: msdyn_ProductDeterminationActionRequestParameters) {
    super("msdyn_ProductDeterminationAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProductDeterminationAction`;

    const body = requestBody({
      SearchIteration: this.Parameters.SearchIteration,
      RequestPayload: this.Parameters.RequestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_ProductDeterminationActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ProductDeterminationActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ProductDeterminationAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProductDeterminationActionResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_ProductDeterminationAction response message
 *
 * `result` is the value the msdyn_ProductDeterminationAction action returns (see {@link msdyn_ProductDeterminationActionResult}).
 */
export class msdyn_ProductDeterminationActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProductDeterminationActionResult) {
    super("msdyn_ProductDeterminationAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ProductDeterminationActionResponse {
    return new msdyn_ProductDeterminationActionResponse(
      data as msdyn_ProductDeterminationActionResult
    );
  }
}
