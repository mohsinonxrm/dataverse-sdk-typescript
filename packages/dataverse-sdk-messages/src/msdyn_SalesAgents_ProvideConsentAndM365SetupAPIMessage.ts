import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_ProvideConsentAndM365SetupAPI request message
 *
 * Web API Action: msdyn_SalesAgents_ProvideConsentAndM365SetupAPI
 */
export class msdyn_SalesAgents_ProvideConsentAndM365SetupAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse>
{
  constructor() {
    super("msdyn_SalesAgents_ProvideConsentAndM365SetupAPI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProvideConsentAndM365SetupAPI`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_ProvideConsentAndM365SetupAPI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResult {
  "@odata.context"?: string;
  msdyn_ConnectionName: string;
  msdyn_NextScheduleRun: number;
}

/**
 * msdyn_SalesAgents_ProvideConsentAndM365SetupAPI response message
 *
 * `result` is the value the msdyn_SalesAgents_ProvideConsentAndM365SetupAPI action returns (see {@link msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResult}).
 */
export class msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResult) {
    super("msdyn_SalesAgents_ProvideConsentAndM365SetupAPI");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse {
    return new msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse(
      data as msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResult
    );
  }
}
