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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_SalesAgents_ProvideConsentAndM365SetupAPI response message
 */
export class msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse) {
    super("msdyn_SalesAgents_ProvideConsentAndM365SetupAPI");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse {
    return new msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse((data as any).value);
  }
}
