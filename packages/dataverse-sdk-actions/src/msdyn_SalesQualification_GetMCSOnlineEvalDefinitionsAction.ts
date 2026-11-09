import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesQualification_GetMCSOnlineEvalDefinitions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse {
  "@odata.context"?: string;
  DefinitionsJson: string;
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * Parameters of the msdyn_SalesQualification_GetMCSOnlineEvalDefinitions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsActionParameters {
  BotSchemaName: string;
}

/**
 * msdyn_SalesQualification_GetMCSOnlineEvalDefinitions action
 *
 * Unbound action
 */
export class msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsAction implements Executable<msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse> {
  constructor(
    public readonly parameters: msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesQualification_GetMCSOnlineEvalDefinitions`;

    const body = requestBody({
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
  ): Promise<msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse;
  }
}
