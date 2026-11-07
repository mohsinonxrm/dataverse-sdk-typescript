import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RetrieveActivities action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveActivitiesResponse {
  "@odata.context"?: string;
  ActivityList: string;
}

/**
 * Parameters of the msdyn_RetrieveActivities action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveActivitiesActionParameters {
  FetchXml: string;
  ClientType: number;
}

/**
 * msdyn_RetrieveActivities action
 *
 * Unbound action
 */
export class msdyn_RetrieveActivitiesAction implements Executable<msdyn_RetrieveActivitiesResponse> {
  constructor(public readonly parameters: msdyn_RetrieveActivitiesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveActivities`;

    const body = requestBody({
      FetchXml: this.parameters.FetchXml,
      ClientType: this.parameters.ClientType,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveActivitiesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveActivitiesResponse;
  }
}
