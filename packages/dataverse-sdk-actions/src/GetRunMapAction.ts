import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the GetRunMap action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetRunMapResponse {
  "@odata.context"?: string;
  continuationToken: string;
  runMap: string;
}

/**
 * Parameters of the GetRunMap action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetRunMapActionParameters {
  continuationToken?: string;
  runId: string;
  max?: number;
}

/**
 * GetRunMap action
 *
 * Bound action
 * Binding parameter: entity (mscrm.businessprocess)
 *
 * The first argument is the id of the businessprocess record to call it on.
 */
export class GetRunMapAction implements Executable<GetRunMapResponse> {
  constructor(
    public readonly businessprocessId: string,
    public readonly parameters: GetRunMapActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/businessprocesses(${this.businessprocessId})/Microsoft.Dynamics.CRM.GetRunMap`;

    const body = requestBody({
      continuationToken: this.parameters.continuationToken,
      runId: this.parameters.runId,
      max: this.parameters.max,
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

  async parseResponse(response: Response): Promise<GetRunMapResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetRunMapResponse;
  }
}
