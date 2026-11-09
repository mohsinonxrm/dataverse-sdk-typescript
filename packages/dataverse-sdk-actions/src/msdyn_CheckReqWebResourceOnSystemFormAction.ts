import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CheckReqWebResourceOnSystemForm action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckReqWebResourceOnSystemFormResponse {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckReqWebResourceOnSystemFormResponse;
  }
}
