import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse as msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksRequestParameters {
  msdyn_SalesMacroAgentType?: number;
  msdyn_TrackingId?: string;
  msdyn_SalesAgentRun?: string;
}

/**
 * msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks request message
 *
 * Web API Action: msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks
 */
export class msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksRequestParameters>;

  constructor(
    parameters: msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksRequestParameters = {}
  ) {
    super("msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks`;

    const body = requestBody({
      msdyn_SalesMacroAgentType: this.Parameters.msdyn_SalesMacroAgentType,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
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
  ): Promise<msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse.fromResponse({});
    return msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks response message
 */
export class msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponseData
  ) {
    super("msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse {
    return new msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse(
      responseObject<msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponseData>(data)
    );
  }
}
