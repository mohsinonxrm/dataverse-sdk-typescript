import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_GetRefreshFrequency message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetRefreshFrequencyRequestParameters {
  ProfileId: string;
}

/**
 * msdyn_SalesAgents_GetRefreshFrequency request message
 *
 * Web API Action: msdyn_SalesAgents_GetRefreshFrequency
 */
export class msdyn_SalesAgents_GetRefreshFrequencyRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetRefreshFrequencyResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetRefreshFrequencyRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetRefreshFrequencyRequestParameters) {
    super("msdyn_SalesAgents_GetRefreshFrequency", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetRefreshFrequency`;

    const body = requestBody({
      ProfileId: this.Parameters.ProfileId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_GetRefreshFrequencyResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_GetRefreshFrequencyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_GetRefreshFrequency action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetRefreshFrequencyResult {
  "@odata.context"?: string;
  IsRefreshEnabled: boolean;
  RefreshFrequencyInDays: number;
}

/**
 * msdyn_SalesAgents_GetRefreshFrequency response message
 *
 * `result` is the value the msdyn_SalesAgents_GetRefreshFrequency action returns (see {@link msdyn_SalesAgents_GetRefreshFrequencyResult}).
 */
export class msdyn_SalesAgents_GetRefreshFrequencyResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetRefreshFrequencyResult) {
    super("msdyn_SalesAgents_GetRefreshFrequency");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_GetRefreshFrequencyResponse {
    return new msdyn_SalesAgents_GetRefreshFrequencyResponse(
      data as msdyn_SalesAgents_GetRefreshFrequencyResult
    );
  }
}
