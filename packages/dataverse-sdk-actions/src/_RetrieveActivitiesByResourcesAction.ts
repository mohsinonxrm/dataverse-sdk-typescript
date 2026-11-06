import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the _RetrieveActivitiesByResources action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _RetrieveActivitiesByResourcesResponse {
  "@odata.context"?: string;
  ExceptionMessage: string;
  Result: string;
}

/**
 * Parameters of the _RetrieveActivitiesByResources action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _RetrieveActivitiesByResourcesActionParameters {
  StartDate: string;
  EndDate: string;
  ResourceIds: string;
  ActivityType: number;
}

/**
 * _RetrieveActivitiesByResources action
 *
 * Unbound action
 */
export class _RetrieveActivitiesByResourcesAction implements Executable<_RetrieveActivitiesByResourcesResponse> {
  constructor(public readonly parameters: _RetrieveActivitiesByResourcesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_RetrieveActivitiesByResources`;

    const body = requestBody({
      StartDate: this.parameters.StartDate,
      EndDate: this.parameters.EndDate,
      ResourceIds: this.parameters.ResourceIds,
      ActivityType: this.parameters.ActivityType,
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

  async parseResponse(response: Response): Promise<_RetrieveActivitiesByResourcesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as _RetrieveActivitiesByResourcesResponse;
  }
}
