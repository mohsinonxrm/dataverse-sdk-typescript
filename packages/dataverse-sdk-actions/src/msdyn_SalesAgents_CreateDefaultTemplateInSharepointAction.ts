import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_CreateDefaultTemplateInSharepoint action
 */
export interface msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse;
    return (await response.json()) as msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse;
  }
}
