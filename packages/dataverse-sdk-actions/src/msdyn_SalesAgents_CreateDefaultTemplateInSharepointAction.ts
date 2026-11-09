import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_SalesAgents_CreateDefaultTemplateInSharepoint action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_CreateDefaultTemplateInSharepoint action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_CreateDefaultTemplateInSharepointAction implements Executable<msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateDefaultTemplateInSharepoint`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse;
  }
}
