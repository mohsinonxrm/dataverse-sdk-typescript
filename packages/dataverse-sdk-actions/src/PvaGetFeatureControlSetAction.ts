import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PvaGetFeatureControlSet action
 */
export interface PvaGetFeatureControlSetResponse {
  FeatureControlSet: string;
}

/**
 * PvaGetFeatureControlSet action
 *
 * Unbound action
 */
export class PvaGetFeatureControlSetAction implements Executable<PvaGetFeatureControlSetResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PvaGetFeatureControlSet`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaGetFeatureControlSetResponse> {
    const data = await response.json();
    return data as PvaGetFeatureControlSetResponse;
  }
}
