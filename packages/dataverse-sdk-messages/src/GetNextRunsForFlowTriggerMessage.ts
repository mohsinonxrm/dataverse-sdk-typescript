import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetNextRunsForFlowTrigger request message
 *
 * Web API Function: GetNextRunsForFlowTrigger
 *
 * The first argument is the id of the flowtrigger record to call it on.
 */
export class GetNextRunsForFlowTriggerRequest
  extends OrganizationRequest
  implements Executable<GetNextRunsForFlowTriggerResponse>
{
  constructor(public flowtriggerId: string) {
    super("GetNextRunsForFlowTrigger");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/flowtriggers(${odataLiteral.guid(this.flowtriggerId)})/Microsoft.Dynamics.CRM.GetNextRunsForFlowTrigger`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetNextRunsForFlowTriggerResponse> {
    // The body is the complex value, with its @odata.context
    return GetNextRunsForFlowTriggerResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetNextRunsForFlowTrigger function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetNextRunsForFlowTriggerResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * GetNextRunsForFlowTrigger response message
 *
 * `result` is the value the GetNextRunsForFlowTrigger function returns (see {@link GetNextRunsForFlowTriggerResult}).
 */
export class GetNextRunsForFlowTriggerResponse extends OrganizationResponse {
  constructor(public result: GetNextRunsForFlowTriggerResult) {
    super("GetNextRunsForFlowTrigger");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetNextRunsForFlowTriggerResponse {
    return new GetNextRunsForFlowTriggerResponse(data as GetNextRunsForFlowTriggerResult);
  }
}
