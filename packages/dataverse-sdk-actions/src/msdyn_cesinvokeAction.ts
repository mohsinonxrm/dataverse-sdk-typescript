import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_cesinvoke action
 */
export interface msdyn_cesinvokeResponse {
  CESResult: string;
  IsSuccess: string;
}

/**
 * Parameters of the msdyn_cesinvoke action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_cesinvokeActionParameters {
  CallType?: string;
  EventName?: string;
  SurveyName?: string;
}

/**
 * msdyn_cesinvoke action
 *
 * Unbound action
 */
export class msdyn_cesinvokeAction implements Executable<msdyn_cesinvokeResponse> {
  constructor(public readonly parameters: msdyn_cesinvokeActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_cesinvoke`;

    const body = requestBody({
      CallType: this.parameters.CallType,
      EventName: this.parameters.EventName,
      SurveyName: this.parameters.SurveyName,
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

  async parseResponse(response: Response): Promise<msdyn_cesinvokeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_cesinvokeResponse;
    return (await response.json()) as msdyn_cesinvokeResponse;
  }
}
