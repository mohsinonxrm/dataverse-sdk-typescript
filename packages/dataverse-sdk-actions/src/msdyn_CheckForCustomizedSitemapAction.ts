import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForCustomizedSitemap action
 */
export interface msdyn_CheckForCustomizedSitemapResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  Helplink: string;
}

/**
 * Parameters of the msdyn_CheckForCustomizedSitemap action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForCustomizedSitemapActionParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckForCustomizedSitemap action
 *
 * Unbound action
 */
export class msdyn_CheckForCustomizedSitemapAction implements Executable<msdyn_CheckForCustomizedSitemapResponse> {
  constructor(public readonly parameters: msdyn_CheckForCustomizedSitemapActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedSitemap`;

    const body = requestBody({
      EntityIds: this.parameters.EntityIds,
      SolutionId: this.parameters.SolutionId,
      ExcludeSolutionIds: this.parameters.ExcludeSolutionIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedSitemapResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckForCustomizedSitemapResponse;
  }
}
