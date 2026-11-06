import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AcknowledgeNudge message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AcknowledgeNudgeRequestParameters {
  partitionid: string;
  ApiVersion: string;
}

/**
 * AcknowledgeNudge request message
 *
 * Web API Action: AcknowledgeNudge
 *
 * The first argument is the id of the msdyn_agentnudge record to call it on.
 */
export class AcknowledgeNudgeRequest
  extends OrganizationRequest
  implements Executable<AcknowledgeNudgeResponse>
{
  declare readonly Parameters: Readonly<AcknowledgeNudgeRequestParameters>;

  constructor(
    public msdyn_agentnudgeId: string,
    parameters: AcknowledgeNudgeRequestParameters
  ) {
    super("AcknowledgeNudge", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_agentnudges(${this.msdyn_agentnudgeId})/Microsoft.Dynamics.CRM.AcknowledgeNudge`;

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

  async parseResponse(response: Response): Promise<AcknowledgeNudgeResponse> {
    // The body is the complex value, with its @odata.context
    return AcknowledgeNudgeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AcknowledgeNudge action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AcknowledgeNudgeResult {
  "@odata.context"?: string;
  Message: string;
}

/**
 * AcknowledgeNudge response message
 *
 * `result` is the value the AcknowledgeNudge action returns (see {@link AcknowledgeNudgeResult}).
 */
export class AcknowledgeNudgeResponse extends OrganizationResponse {
  constructor(public result: AcknowledgeNudgeResult) {
    super("AcknowledgeNudge");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AcknowledgeNudgeResponse {
    return new AcknowledgeNudgeResponse(data as AcknowledgeNudgeResult);
  }
}
