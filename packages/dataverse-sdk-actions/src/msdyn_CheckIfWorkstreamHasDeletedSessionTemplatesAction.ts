import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfWorkstreamHasDeletedSessionTemplates action
 */
export interface msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfWorkstreamHasDeletedSessionTemplates action
 *
 * Unbound action
 */
export class msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesAction implements Executable<msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfWorkstreamHasDeletedSessionTemplates`;

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
  ): Promise<msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse;
    return (await response.json()) as msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse;
  }
}
