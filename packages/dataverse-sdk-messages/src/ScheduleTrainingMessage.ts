import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ScheduleTraining message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ScheduleTrainingRequestParameters {
  version: string;
}

/**
 * ScheduleTraining request message
 *
 * Web API Action: ScheduleTraining
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class ScheduleTrainingRequest
  extends OrganizationRequest
  implements Executable<ScheduleTrainingResponse>
{
  declare readonly Parameters: Readonly<ScheduleTrainingRequestParameters>;

  constructor(
    public msdyn_aiconfigurationId: string,
    parameters: ScheduleTrainingRequestParameters
  ) {
    super("ScheduleTraining", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${odataLiteral.guid(this.msdyn_aiconfigurationId)})/Microsoft.Dynamics.CRM.ScheduleTraining`;

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

  async parseResponse(response: Response): Promise<ScheduleTrainingResponse> {
    // The body is the complex value, with its @odata.context
    return ScheduleTrainingResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ScheduleTraining action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ScheduleTrainingResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * ScheduleTraining response message
 *
 * `result` is the value the ScheduleTraining action returns (see {@link ScheduleTrainingResult}).
 */
export class ScheduleTrainingResponse extends OrganizationResponse {
  constructor(public result: ScheduleTrainingResult) {
    super("ScheduleTraining");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ScheduleTrainingResponse {
    return new ScheduleTrainingResponse(data as ScheduleTrainingResult);
  }
}
