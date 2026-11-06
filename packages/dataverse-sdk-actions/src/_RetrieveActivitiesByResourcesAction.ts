import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from _RetrieveActivitiesByResources action
 */
export interface _RetrieveActivitiesByResourcesResponse {
  Result: string;
  ExceptionMessage: string;
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as _RetrieveActivitiesByResourcesResponse;
    return (await response.json()) as _RetrieveActivitiesByResourcesResponse;
  }
}
