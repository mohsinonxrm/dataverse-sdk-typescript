import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForCustomizedSitemapResponse as msdyn_CheckForCustomizedSitemapResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForCustomizedSitemap message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForCustomizedSitemapRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckForCustomizedSitemap request message
 *
 * Web API Action: msdyn_CheckForCustomizedSitemap
 */
export class msdyn_CheckForCustomizedSitemapRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForCustomizedSitemapResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForCustomizedSitemapRequestParameters>;

  constructor(parameters: msdyn_CheckForCustomizedSitemapRequestParameters = {}) {
    super("msdyn_CheckForCustomizedSitemap", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedSitemap`;

    const body = requestBody({
      EntityIds: this.Parameters.EntityIds,
      SolutionId: this.Parameters.SolutionId,
      ExcludeSolutionIds: this.Parameters.ExcludeSolutionIds,
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
    return msdyn_CheckForCustomizedSitemapResponse.fromResponse(text ? JSON.parse(text) : {});
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
