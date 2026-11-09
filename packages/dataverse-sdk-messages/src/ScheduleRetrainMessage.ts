import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ScheduleRetrain message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ScheduleRetrainRequestParameters {
  recurrence: string;
  version: string;
}

/**
 * ScheduleRetrain request message
 *
 * Web API Action: ScheduleRetrain
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class ScheduleRetrainRequest
  extends OrganizationRequest
  implements Executable<ScheduleRetrainResponse>
{
  declare readonly Parameters: Readonly<ScheduleRetrainRequestParameters>;

  constructor(
    public msdyn_aimodelId: string,
    parameters: ScheduleRetrainRequestParameters
  ) {
    super("ScheduleRetrain", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${odataLiteral.guid(this.msdyn_aimodelId)})/Microsoft.Dynamics.CRM.ScheduleRetrain`;

    const body = requestBody({
      recurrence: this.Parameters.recurrence,
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

  async parseResponse(response: Response): Promise<ScheduleRetrainResponse> {
    // The body is the complex value, with its @odata.context
    return ScheduleRetrainResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ScheduleRetrain action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ScheduleRetrainResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * ScheduleRetrain response message
 *
 * `result` is the value the ScheduleRetrain action returns (see {@link ScheduleRetrainResult}).
 */
export class ScheduleRetrainResponse extends OrganizationResponse {
  constructor(public result: ScheduleRetrainResult) {
    super("ScheduleRetrain");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ScheduleRetrainResponse {
    return new ScheduleRetrainResponse(data as ScheduleRetrainResult);
  }
}
