import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfSLAStaticFlowIsDisabled action
 */
export interface msdyn_CheckIfSLAStaticFlowIsDisabledResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckIfSLAStaticFlowIsDisabledResponse;
    return (await response.json()) as msdyn_CheckIfSLAStaticFlowIsDisabledResponse;
  }
}
