import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfSLAStaticFlowIsDisabled action
 */
export interface msdyn_CheckIfSLAStaticFlowIsDisabledResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  HelpLink: string;
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
    const data = await response.json();
    return data as msdyn_CheckIfSLAStaticFlowIsDisabledResponse;
  }
}
