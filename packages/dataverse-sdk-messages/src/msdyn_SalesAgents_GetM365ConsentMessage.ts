import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_GetM365Consent request message
 *
 * Web API Action: msdyn_SalesAgents_GetM365Consent
 */
export class msdyn_SalesAgents_GetM365ConsentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetM365ConsentResponse>
{
  constructor() {
    super("msdyn_SalesAgents_GetM365Consent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetM365Consent`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_GetM365ConsentResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_GetM365ConsentResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_SalesAgents_GetM365Consent response message
 */
export class msdyn_SalesAgents_GetM365ConsentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetM365ConsentResponse) {
    super("msdyn_SalesAgents_GetM365Consent");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetM365ConsentResponse {
    return new msdyn_SalesAgents_GetM365ConsentResponse((data as any).value);
  }
}
