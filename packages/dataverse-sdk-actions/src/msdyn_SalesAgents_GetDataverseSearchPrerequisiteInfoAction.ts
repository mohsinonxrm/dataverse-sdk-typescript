import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * Parameters of the msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoActionParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoAction implements Executable<msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo`;

    const body = requestBody({
      RequestJson: this.parameters.RequestJson,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse;
  }
}
