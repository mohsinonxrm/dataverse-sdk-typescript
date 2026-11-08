import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveApplicationRibbon request message
 *
 * Web API Function: RetrieveApplicationRibbon
 */
export class RetrieveApplicationRibbonRequest
  extends OrganizationRequest
  implements Executable<RetrieveApplicationRibbonResponse>
{
  constructor() {
    super("RetrieveApplicationRibbon");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveApplicationRibbon`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveApplicationRibbonResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveApplicationRibbonResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveApplicationRibbon function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveApplicationRibbonResult {
  "@odata.context"?: string;
  CompressedApplicationRibbonXml: string;
}

/**
 * RetrieveApplicationRibbon response message
 *
 * `result` is the value the RetrieveApplicationRibbon function returns (see {@link RetrieveApplicationRibbonResult}).
 */
export class RetrieveApplicationRibbonResponse extends OrganizationResponse {
  constructor(public result: RetrieveApplicationRibbonResult) {
    super("RetrieveApplicationRibbon");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveApplicationRibbonResponse {
    return new RetrieveApplicationRibbonResponse(data as RetrieveApplicationRibbonResult);
  }
}
