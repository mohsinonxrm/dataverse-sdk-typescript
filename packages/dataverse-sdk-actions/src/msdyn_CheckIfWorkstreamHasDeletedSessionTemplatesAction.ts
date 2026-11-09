import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckIfWorkstreamHasDeletedSessionTemplates action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse;
  }
}
