import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the msdyn_CheckReqWebResourceOnSystemForm action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckReqWebResourceOnSystemFormActionParameters {
  EntityAndWebResourceList?: string;
}

/**
 * msdyn_CheckReqWebResourceOnSystemForm action
 *
 * Unbound action
 */
export class msdyn_CheckReqWebResourceOnSystemFormAction implements Executable<msdyn_CheckReqWebResourceOnSystemFormResponse> {
  constructor(
    public readonly parameters: msdyn_CheckReqWebResourceOnSystemFormActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckReqWebResourceOnSystemForm`;

    const body = requestBody({
      EntityAndWebResourceList: this.parameters.EntityAndWebResourceList,
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

  async parseResponse(response: Response): Promise<msdyn_CheckReqWebResourceOnSystemFormResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckReqWebResourceOnSystemFormResponse;
  }
}
