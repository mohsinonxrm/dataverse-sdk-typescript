import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DismissNudge message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DismissNudgeRequestParameters {
  partitionid: string;
  ApiVersion: string;
}

/**
 * DismissNudge request message
 *
 * Web API Action: DismissNudge
 *
 * The first argument is the id of the msdyn_agentnudge record to call it on.
 */
export class DismissNudgeRequest
  extends OrganizationRequest
  implements Executable<DismissNudgeResponse>
{
  declare readonly Parameters: Readonly<DismissNudgeRequestParameters>;

  constructor(
    public msdyn_agentnudgeId: string,
    parameters: DismissNudgeRequestParameters
  ) {
    super("DismissNudge", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_agentnudges(${this.msdyn_agentnudgeId})/Microsoft.Dynamics.CRM.DismissNudge`;

    const body = requestBody({
      partitionid: this.Parameters.partitionid,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<DismissNudgeResponse> {
    // The body is the complex value, with its @odata.context
    return DismissNudgeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DismissNudge action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DismissNudgeResult {
  "@odata.context"?: string;
  Message: string;
}

/**
 * DismissNudge response message
 *
 * `result` is the value the DismissNudge action returns (see {@link DismissNudgeResult}).
 */
export class DismissNudgeResponse extends OrganizationResponse {
  constructor(public result: DismissNudgeResult) {
    super("DismissNudge");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DismissNudgeResponse {
    return new DismissNudgeResponse(data as DismissNudgeResult);
  }
}
