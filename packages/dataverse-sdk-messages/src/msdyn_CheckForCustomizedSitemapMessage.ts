import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForCustomizedSitemapResponse as msdyn_CheckForCustomizedSitemapResponseData } from "./types/index.js";

/**
 * msdyn_CheckForCustomizedSitemap request message
 *
 * Web API Action: msdyn_CheckForCustomizedSitemap
 */
export class msdyn_CheckForCustomizedSitemapRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForCustomizedSitemapResponse>
{
  constructor(
    public entityIds?: string,
    public solutionId?: string,
    public excludeSolutionIds?: string
  ) {
    super("msdyn_CheckForCustomizedSitemap");
  }

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
    return msdyn_CheckForCustomizedSitemapResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckForCustomizedSitemap response message
 */
export class msdyn_CheckForCustomizedSitemapResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForCustomizedSitemapResponseData) {
    super("msdyn_CheckForCustomizedSitemap");
  }

  static fromResponse(data: unknown): msdyn_CheckForCustomizedSitemapResponse {
    return new msdyn_CheckForCustomizedSitemapResponse(
      responseObject<msdyn_CheckForCustomizedSitemapResponseData>(data)
    );
  }
}
