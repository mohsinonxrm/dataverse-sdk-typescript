import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesQualification_DeleteMCSOnlineEvalDefinition message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionRequestParameters {
  BotSchemaName: string;
  DefinitionId: string;
}

/**
 * msdyn_SalesQualification_DeleteMCSOnlineEvalDefinition request message
 *
 * Web API Action: msdyn_SalesQualification_DeleteMCSOnlineEvalDefinition
 */
export class msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionRequestParameters>;

  constructor(parameters: msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionRequestParameters) {
    super("msdyn_SalesQualification_DeleteMCSOnlineEvalDefinition", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesQualification_DeleteMCSOnlineEvalDefinition`;

    const body = requestBody({
      BotSchemaName: this.Parameters.BotSchemaName,
      DefinitionId: this.Parameters.DefinitionId,
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
  ): Promise<msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesQualification_DeleteMCSOnlineEvalDefinition action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * msdyn_SalesQualification_DeleteMCSOnlineEvalDefinition response message
 *
 * `result` is the value the msdyn_SalesQualification_DeleteMCSOnlineEvalDefinition action returns (see {@link msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResult}).
 */
export class msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResult) {
    super("msdyn_SalesQualification_DeleteMCSOnlineEvalDefinition");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponse {
    return new msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponse(
      data as msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResult
    );
  }
}
