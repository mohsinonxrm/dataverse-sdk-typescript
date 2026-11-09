import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CheckForCustomizedSitemapResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckForCustomizedSitemap action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForCustomizedSitemapResult {
  "@odata.context"?: string;
  Helplink: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckForCustomizedSitemap response message
 *
 * `result` is the value the msdyn_CheckForCustomizedSitemap action returns (see {@link msdyn_CheckForCustomizedSitemapResult}).
 */
export class msdyn_CheckForCustomizedSitemapResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForCustomizedSitemapResult) {
    super("msdyn_CheckForCustomizedSitemap");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckForCustomizedSitemapResponse {
    return new msdyn_CheckForCustomizedSitemapResponse(
      data as msdyn_CheckForCustomizedSitemapResult
    );
  }
}
