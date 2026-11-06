import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_FetchEvaluatedEntityInputConfig action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FetchEvaluatedEntityInputConfigResponse {
  "@odata.context"?: string;
  Representative: string;
  entity_data: string;
}

/**
 * Parameters of the msdyn_FetchEvaluatedEntityInputConfig action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchEvaluatedEntityInputConfigActionParameters {
  regardingEntityLogicalName: string;
  regardingEntityId: string;
  ParticipantScope?: number;
}

/**
 * msdyn_FetchEvaluatedEntityInputConfig action
 *
 * Unbound action
 */
export class msdyn_FetchEvaluatedEntityInputConfigAction implements Executable<msdyn_FetchEvaluatedEntityInputConfigResponse> {
  constructor(public readonly parameters: msdyn_FetchEvaluatedEntityInputConfigActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchEvaluatedEntityInputConfig`;

    const body = requestBody({
      regardingEntityLogicalName: this.parameters.regardingEntityLogicalName,
      regardingEntityId: this.parameters.regardingEntityId,
      ParticipantScope: this.parameters.ParticipantScope,
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

  async parseResponse(response: Response): Promise<msdyn_FetchEvaluatedEntityInputConfigResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_FetchEvaluatedEntityInputConfigResponse;
  }
}
