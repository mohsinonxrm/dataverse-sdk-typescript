import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfAppProfileHasGenericTemplates action
 */
export interface msdyn_CheckIfAppProfileHasGenericTemplatesResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfAppProfileHasGenericTemplates action
 *
 * Unbound action
 */
export class msdyn_CheckIfAppProfileHasGenericTemplatesAction implements Executable<msdyn_CheckIfAppProfileHasGenericTemplatesResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfAppProfileHasGenericTemplates`;

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
  ): Promise<msdyn_CheckIfAppProfileHasGenericTemplatesResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfAppProfileHasGenericTemplatesResponse;
  }
}
