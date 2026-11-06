import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResult {
  "@odata.context"?: string;
  msdyn_CanExecuteAgent: boolean;
}

/**
 * msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks response message
 *
 * `result` is the value the msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks action returns (see {@link msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResult}).
 */
export class msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResult) {
    super("msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecks");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse {
    return new msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse(
      data as msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResult
    );
  }
}
