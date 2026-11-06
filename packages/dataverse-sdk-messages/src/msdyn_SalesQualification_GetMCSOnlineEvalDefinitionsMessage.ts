import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesQualification_GetMCSOnlineEvalDefinitions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsRequestParameters {
  BotSchemaName: string;
}

/**
 * msdyn_SalesQualification_GetMCSOnlineEvalDefinitions request message
 *
 * Web API Action: msdyn_SalesQualification_GetMCSOnlineEvalDefinitions
 */
export class msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsRequestParameters>;

  constructor(parameters: msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsRequestParameters) {
    super("msdyn_SalesQualification_GetMCSOnlineEvalDefinitions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesQualification_GetMCSOnlineEvalDefinitions`;

    const body = requestBody({
      BotSchemaName: this.Parameters.BotSchemaName,
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
    return msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesQualification_GetMCSOnlineEvalDefinitions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResult {
  "@odata.context"?: string;
  DefinitionsJson: string;
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * msdyn_SalesQualification_GetMCSOnlineEvalDefinitions response message
 *
 * `result` is the value the msdyn_SalesQualification_GetMCSOnlineEvalDefinitions action returns (see {@link msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResult}).
 */
export class msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResult) {
    super("msdyn_SalesQualification_GetMCSOnlineEvalDefinitions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse {
    return new msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse(
      data as msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResult
    );
  }
}
