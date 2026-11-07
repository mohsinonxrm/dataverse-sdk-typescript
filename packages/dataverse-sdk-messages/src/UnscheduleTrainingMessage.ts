import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UnscheduleTraining message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnscheduleTrainingRequestParameters {
  version: string;
}

/**
 * UnscheduleTraining request message
 *
 * Web API Action: UnscheduleTraining
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class UnscheduleTrainingRequest
  extends OrganizationRequest
  implements Executable<UnscheduleTrainingResponse>
{
  declare readonly Parameters: Readonly<UnscheduleTrainingRequestParameters>;

  constructor(
    public msdyn_aiconfigurationId: string,
    parameters: UnscheduleTrainingRequestParameters
  ) {
    super("UnscheduleTraining", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.UnscheduleTraining`;

    const body = requestBody({
      version: this.Parameters.version,
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

  async parseResponse(response: Response): Promise<UnscheduleTrainingResponse> {
    // The body is the complex value, with its @odata.context
    return UnscheduleTrainingResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the UnscheduleTraining action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface UnscheduleTrainingResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * UnscheduleTraining response message
 *
 * `result` is the value the UnscheduleTraining action returns (see {@link UnscheduleTrainingResult}).
 */
export class UnscheduleTrainingResponse extends OrganizationResponse {
  constructor(public result: UnscheduleTrainingResult) {
    super("UnscheduleTraining");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): UnscheduleTrainingResponse {
    return new UnscheduleTrainingResponse(data as UnscheduleTrainingResult);
  }
}
