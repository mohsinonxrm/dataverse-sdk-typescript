import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesQualification_GetMCSOnlineEvalSummary action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse;
  }
}
