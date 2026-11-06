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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse;
  }
}
