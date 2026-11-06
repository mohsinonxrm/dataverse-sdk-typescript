import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesQualification_AddMCSOnlineEvalDefinition message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesQualification_AddMCSOnlineEvalDefinitionRequestParameters {
  BotSchemaName: string;
  DefinitionRequestJson: string;
}

/**
 * msdyn_SalesQualification_AddMCSOnlineEvalDefinition request message
 *
 * Web API Action: msdyn_SalesQualification_AddMCSOnlineEvalDefinition
 */
export class msdyn_SalesQualification_AddMCSOnlineEvalDefinitionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesQualification_AddMCSOnlineEvalDefinitionRequestParameters>;

  constructor(parameters: msdyn_SalesQualification_AddMCSOnlineEvalDefinitionRequestParameters) {
    super("msdyn_SalesQualification_AddMCSOnlineEvalDefinition", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesQualification_AddMCSOnlineEvalDefinition`;

    const body = requestBody({
      BotSchemaName: this.Parameters.BotSchemaName,
      DefinitionRequestJson: this.Parameters.DefinitionRequestJson,
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
  ): Promise<msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesQualification_AddMCSOnlineEvalDefinition action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResult {
  "@odata.context"?: string;
  DefinitionJson: string;
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * msdyn_SalesQualification_AddMCSOnlineEvalDefinition response message
 *
 * `result` is the value the msdyn_SalesQualification_AddMCSOnlineEvalDefinition action returns (see {@link msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResult}).
 */
export class msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResult) {
    super("msdyn_SalesQualification_AddMCSOnlineEvalDefinition");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponse {
    return new msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponse(
      data as msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResult
    );
  }
}
