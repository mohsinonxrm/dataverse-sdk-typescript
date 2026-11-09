import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the PvaGetFeatureControlSet action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PvaGetFeatureControlSetResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as PvaGetFeatureControlSetResponse;
  }
}
