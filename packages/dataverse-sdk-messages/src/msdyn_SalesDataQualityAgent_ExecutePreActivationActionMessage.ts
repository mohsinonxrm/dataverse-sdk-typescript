import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_ExecutePreActivationAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ExecutePreActivationActionRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_ExecutePreActivationAction request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_ExecutePreActivationAction
 */
export class msdyn_SalesDataQualityAgent_ExecutePreActivationActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_ExecutePreActivationActionRequestParameters>;

  constructor(parameters: msdyn_SalesDataQualityAgent_ExecutePreActivationActionRequestParameters) {
    super("msdyn_SalesDataQualityAgent_ExecutePreActivationAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_ExecutePreActivationAction`;

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
  ): Promise<msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesDataQualityAgent_ExecutePreActivationAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_ExecutePreActivationActionResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_ExecutePreActivationAction response message
 *
 * `result` is the value the msdyn_SalesDataQualityAgent_ExecutePreActivationAction action returns (see {@link msdyn_SalesDataQualityAgent_ExecutePreActivationActionResult}).
 */
export class msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_ExecutePreActivationActionResult) {
    super("msdyn_SalesDataQualityAgent_ExecutePreActivationAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse {
    return new msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse(
      data as msdyn_SalesDataQualityAgent_ExecutePreActivationActionResult
    );
  }
}
