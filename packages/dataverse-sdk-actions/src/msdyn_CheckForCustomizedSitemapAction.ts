import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * msdyn_CheckForCustomizedSitemap action
 *
 * Unbound action
 */
export class msdyn_CheckForCustomizedSitemapAction implements Executable<msdyn_CheckForCustomizedSitemapResponse> {
  constructor(
    public readonly entityIds: string,
    public readonly solutionId: string,
    public readonly excludeSolutionIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedSitemap`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
      SolutionId: this.solutionId,
      ExcludeSolutionIds: this.excludeSolutionIds,
    };

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
    const data = await response.json();
    return data as msdyn_CheckForCustomizedSitemapResponse;
  }
}
