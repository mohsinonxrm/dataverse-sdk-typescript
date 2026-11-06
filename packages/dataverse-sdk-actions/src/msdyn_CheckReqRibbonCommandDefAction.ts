import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckReqRibbonCommandDef action
 */
export interface msdyn_CheckReqRibbonCommandDefResponse {
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_CheckReqRibbonCommandDef action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckReqRibbonCommandDefActionParameters {
  CommandAndEntityList?: string;
}

/**
 * msdyn_CheckReqRibbonCommandDef action
 *
 * Unbound action
 */
export class msdyn_CheckReqRibbonCommandDefAction implements Executable<msdyn_CheckReqRibbonCommandDefResponse> {
  constructor(public readonly parameters: msdyn_CheckReqRibbonCommandDefActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckReqRibbonCommandDef`;

    const body = requestBody({
      CommandAndEntityList: this.parameters.CommandAndEntityList,
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

  async parseResponse(response: Response): Promise<msdyn_CheckReqRibbonCommandDefResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckReqRibbonCommandDefResponse;
    return (await response.json()) as msdyn_CheckReqRibbonCommandDefResponse;
  }
}
