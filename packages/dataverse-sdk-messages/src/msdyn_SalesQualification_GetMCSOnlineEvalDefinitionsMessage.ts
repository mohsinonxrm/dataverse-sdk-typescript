import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse as msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse.fromResponse({});
    return msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesQualification_GetMCSOnlineEvalDefinitions response message
 */
export class msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponseData) {
    super("msdyn_SalesQualification_GetMCSOnlineEvalDefinitions");
  }

  static fromResponse(data: unknown): msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse {
    return new msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse(
      responseObject<msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponseData>(data)
    );
  }
}
