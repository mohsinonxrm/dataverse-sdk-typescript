import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckIfEmailResponseTemplateEntityTypeMatch action
 */
export interface msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
}

/**
 * Parameters of the msdyn_CheckIfEmailResponseTemplateEntityTypeMatch action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfEmailResponseTemplateEntityTypeMatchActionParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckIfEmailResponseTemplateEntityTypeMatch action
 *
 * Unbound action
 */
export class msdyn_CheckIfEmailResponseTemplateEntityTypeMatchAction implements Executable<msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse> {
  constructor(
    public readonly parameters: msdyn_CheckIfEmailResponseTemplateEntityTypeMatchActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfEmailResponseTemplateEntityTypeMatch`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse;
    return (await response.json()) as msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse;
  }
}
