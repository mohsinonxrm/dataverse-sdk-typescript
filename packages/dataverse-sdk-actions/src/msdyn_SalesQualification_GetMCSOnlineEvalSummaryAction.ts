import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesQualification_GetMCSOnlineEvalSummary action
 */
export interface msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse {
  ErrorMessage: string;
  IsSuccess: boolean;
  SummaryJson: string;
}

/**
 * Parameters of the msdyn_SalesQualification_GetMCSOnlineEvalSummary action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesQualification_GetMCSOnlineEvalSummaryActionParameters {
  UtcStartTime: string;
  UtcEndTime: string;
  BotSchemaName: string;
}

/**
 * msdyn_SalesQualification_GetMCSOnlineEvalSummary action
 *
 * Unbound action
 */
export class msdyn_SalesQualification_GetMCSOnlineEvalSummaryAction implements Executable<msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse> {
  constructor(
    public readonly parameters: msdyn_SalesQualification_GetMCSOnlineEvalSummaryActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesQualification_GetMCSOnlineEvalSummary`;

    const body = requestBody({
      UtcStartTime: this.parameters.UtcStartTime,
      UtcEndTime: this.parameters.UtcEndTime,
      BotSchemaName: this.parameters.BotSchemaName,
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
  ): Promise<msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse;
    return (await response.json()) as msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse;
  }
}
