import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponse as msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponse.fromResponse({});
    return msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesQualification_DeleteMCSOnlineEvalDefinition response message
 */
export class msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponseData) {
    super("msdyn_SalesQualification_DeleteMCSOnlineEvalDefinition");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponse {
    return new msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponse(
      responseObject<msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponseData>(data)
    );
  }
}
