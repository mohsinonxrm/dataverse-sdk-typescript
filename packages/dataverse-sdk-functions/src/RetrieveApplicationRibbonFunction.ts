import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveApplicationRibbon function
 */
export interface RetrieveApplicationRibbonResponse {
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
    const data = await response.json();
    return data as RetrieveApplicationRibbonResponse;
  }
}
