import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckIfSLAStaticFlowIsDisabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfSLAStaticFlowIsDisabledResponse {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfSLAStaticFlowIsDisabled action
 *
 * Unbound action
 */
export class msdyn_CheckIfSLAStaticFlowIsDisabledAction implements Executable<msdyn_CheckIfSLAStaticFlowIsDisabledResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfSLAStaticFlowIsDisabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfSLAStaticFlowIsDisabledResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckIfSLAStaticFlowIsDisabledResponse;
  }
}
