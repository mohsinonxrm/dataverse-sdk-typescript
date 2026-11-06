import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckReqRibbonCommandDef action
 */
export interface msdyn_CheckReqRibbonCommandDefResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
  ReturnSeverity: number;
  HelpLink: string;
}

/**
 * msdyn_CheckReqRibbonCommandDef action
 *
 * Unbound action
 */
export class msdyn_CheckReqRibbonCommandDefAction implements Executable<msdyn_CheckReqRibbonCommandDefResponse> {
  constructor(public readonly commandAndEntityList?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckReqRibbonCommandDef`;

    const body: Record<string, unknown> = {
      CommandAndEntityList: this.commandAndEntityList,
    };

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
    const data = await response.json();
    return data as msdyn_CheckReqRibbonCommandDefResponse;
  }
}
