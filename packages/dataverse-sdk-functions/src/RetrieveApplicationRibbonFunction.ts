import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RetrieveApplicationRibbon function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveApplicationRibbonResponse {
  "@odata.context"?: string;
  CompressedApplicationRibbonXml: string;
}

/**
 * RetrieveApplicationRibbon function
 *
 * Unbound function
 */
export class RetrieveApplicationRibbonFunction implements Executable<RetrieveApplicationRibbonResponse> {
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
    return (await response.json()) as RetrieveApplicationRibbonResponse;
  }
}
