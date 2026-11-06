import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_FpsAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FpsActionRequestParameters {
  Type: number;
  InputParameter?: string;
}

/**
 * msdyn_FpsAction request message
 *
 * Web API Action: msdyn_FpsAction
 */
export class msdyn_FpsActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FpsActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_FpsActionRequestParameters>;

  constructor(parameters: msdyn_FpsActionRequestParameters) {
    super("msdyn_FpsAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FpsAction`;

    const body = requestBody({
      Type: this.Parameters.Type,
      InputParameter: this.Parameters.InputParameter,
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

  async parseResponse(response: Response): Promise<msdyn_FpsActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_FpsActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_FpsAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FpsActionResult {
  "@odata.context"?: string;
  OutputParameter: string;
}

/**
 * msdyn_FpsAction response message
 *
 * `result` is the value the msdyn_FpsAction action returns (see {@link msdyn_FpsActionResult}).
 */
export class msdyn_FpsActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FpsActionResult) {
    super("msdyn_FpsAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_FpsActionResponse {
    return new msdyn_FpsActionResponse(data as msdyn_FpsActionResult);
  }
}
