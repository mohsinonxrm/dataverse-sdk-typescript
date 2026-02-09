import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetSalesCopilotConsentAndInfraStatus request message
 *
 * Web API Action: msdyn_GetSalesCopilotConsentAndInfraStatus
 */
export class msdyn_GetSalesCopilotConsentAndInfraStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesCopilotConsentAndInfraStatusResponse>
{
  constructor(public msdyn_payload: string) {
    super("msdyn_GetSalesCopilotConsentAndInfraStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesCopilotConsentAndInfraStatus`;

    const body: Record<string, unknown> = {
      msdyn_payload: this.msdyn_payload,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetSalesCopilotConsentAndInfraStatusResponse> {
    const data = await response.json();
    return msdyn_GetSalesCopilotConsentAndInfraStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_payload: this.msdyn_payload,
    };
  }
}

/**
 * msdyn_GetSalesCopilotConsentAndInfraStatus response message
 */
export class msdyn_GetSalesCopilotConsentAndInfraStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesCopilotConsentAndInfraStatusResponse) {
    super("msdyn_GetSalesCopilotConsentAndInfraStatus");
  }

  static fromResponse(data: unknown): msdyn_GetSalesCopilotConsentAndInfraStatusResponse {
    return new msdyn_GetSalesCopilotConsentAndInfraStatusResponse((data as any).value);
  }
}
