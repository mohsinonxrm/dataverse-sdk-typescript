import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_ExecutePostActivationAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ExecutePostActivationActionRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_ExecutePostActivationAction request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_ExecutePostActivationAction
 */
export class msdyn_SalesDataQualityAgent_ExecutePostActivationActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_ExecutePostActivationActionRequestParameters>;

  constructor(
    parameters: msdyn_SalesDataQualityAgent_ExecutePostActivationActionRequestParameters
  ) {
    super("msdyn_SalesDataQualityAgent_ExecutePostActivationAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_ExecutePostActivationAction`;

    const body = requestBody({
      RequestJson: this.Parameters.RequestJson,
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
  ): Promise<msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesDataQualityAgent_ExecutePostActivationAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_ExecutePostActivationActionResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_ExecutePostActivationAction response message
 *
 * `result` is the value the msdyn_SalesDataQualityAgent_ExecutePostActivationAction action returns (see {@link msdyn_SalesDataQualityAgent_ExecutePostActivationActionResult}).
 */
export class msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_ExecutePostActivationActionResult) {
    super("msdyn_SalesDataQualityAgent_ExecutePostActivationAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse {
    return new msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse(
      data as msdyn_SalesDataQualityAgent_ExecutePostActivationActionResult
    );
  }
}
