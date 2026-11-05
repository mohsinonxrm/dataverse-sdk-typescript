import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckReqWebResourceOnSystemForm action
 */
export interface msdyn_CheckReqWebResourceOnSystemFormResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
  ReturnSeverity: number;
  HelpLink: string;
}

/**
 * msdyn_CheckReqWebResourceOnSystemForm action
 *
 * Unbound action
 */
export class msdyn_CheckReqWebResourceOnSystemFormAction implements Executable<msdyn_CheckReqWebResourceOnSystemFormResponse> {
  constructor(public readonly entityAndWebResourceList: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckReqWebResourceOnSystemForm`;

    const body: Record<string, unknown> = {
      EntityAndWebResourceList: this.entityAndWebResourceList,
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

  async parseResponse(response: Response): Promise<msdyn_CheckReqWebResourceOnSystemFormResponse> {
    const data = await response.json();
    return data as msdyn_CheckReqWebResourceOnSystemFormResponse;
  }
}
