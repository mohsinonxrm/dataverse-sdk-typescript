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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckIfAppProfileHasGenericTemplatesResponse;
  }
}
