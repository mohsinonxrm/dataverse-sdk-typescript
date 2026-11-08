import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the GetNextRunsForFlowTrigger function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetNextRunsForFlowTriggerResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * GetNextRunsForFlowTrigger function
 *
 * Bound function
 * Binding parameter: entity (mscrm.flowtrigger)
 *
 * The first argument is the id of the flowtrigger record to call it on.
 */
export class GetNextRunsForFlowTriggerFunction implements Executable<GetNextRunsForFlowTriggerResponse> {
  constructor(public readonly flowtriggerId: string) {}

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
    return (await response.json()) as GetNextRunsForFlowTriggerResponse;
  }
}
