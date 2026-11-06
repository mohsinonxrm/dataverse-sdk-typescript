import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetResourceUtilizationGrid message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourceUtilizationGridRequestParameters {
  TargetUtils: string;
  ResourceIds: string;
  Start: string;
  End: string;
  Timescale: number;
}

/**
 * msdyn_GetResourceUtilizationGrid request message
 *
 * Web API Action: msdyn_GetResourceUtilizationGrid
 */
export class msdyn_GetResourceUtilizationGridRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourceUtilizationGridResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetResourceUtilizationGridRequestParameters>;

  constructor(parameters: msdyn_GetResourceUtilizationGridRequestParameters) {
    super("msdyn_GetResourceUtilizationGrid", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceUtilizationGrid`;

    const body = requestBody({
      TargetUtils: this.Parameters.TargetUtils,
      ResourceIds: this.Parameters.ResourceIds,
      Start: this.Parameters.Start,
      End: this.Parameters.End,
      Timescale: this.Parameters.Timescale,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceUtilizationGridResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetResourceUtilizationGridResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetResourceUtilizationGrid action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourceUtilizationGridResult {
  "@odata.context"?: string;
  ChartItems: string;
}

/**
 * msdyn_GetResourceUtilizationGrid response message
 *
 * `result` is the value the msdyn_GetResourceUtilizationGrid action returns (see {@link msdyn_GetResourceUtilizationGridResult}).
 */
export class msdyn_GetResourceUtilizationGridResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourceUtilizationGridResult) {
    super("msdyn_GetResourceUtilizationGrid");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetResourceUtilizationGridResponse {
    return new msdyn_GetResourceUtilizationGridResponse(
      data as msdyn_GetResourceUtilizationGridResult
    );
  }
}
