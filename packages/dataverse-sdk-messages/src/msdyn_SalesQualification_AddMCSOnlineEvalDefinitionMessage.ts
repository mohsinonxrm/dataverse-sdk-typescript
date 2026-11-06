import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponse as msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponse.fromResponse({});
    return msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesQualification_AddMCSOnlineEvalDefinition response message
 */
export class msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponseData) {
    super("msdyn_SalesQualification_AddMCSOnlineEvalDefinition");
  }

  static fromResponse(data: unknown): msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponse {
    return new msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponse(
      responseObject<msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponseData>(data)
    );
  }
}
