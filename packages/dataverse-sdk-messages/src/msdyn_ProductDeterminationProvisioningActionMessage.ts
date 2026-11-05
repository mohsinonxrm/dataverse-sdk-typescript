import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ProductDeterminationProvisioningAction request message
 *
 * Web API Action: msdyn_ProductDeterminationProvisioningAction
 */
export class msdyn_ProductDeterminationProvisioningActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProductDeterminationProvisioningActionResponse>
{
  constructor(public requestPayload: string) {
    super("msdyn_ProductDeterminationProvisioningAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProductDeterminationProvisioningAction`;

    const body: Record<string, unknown> = {
      RequestPayload: this.requestPayload,
    };

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
  ): Promise<msdyn_ProductDeterminationProvisioningActionResponse> {
    const data = await response.json();
    return msdyn_ProductDeterminationProvisioningActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RequestPayload: this.requestPayload,
    };
  }
}

/**
 * msdyn_ProductDeterminationProvisioningAction response message
 */
export class msdyn_ProductDeterminationProvisioningActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProductDeterminationProvisioningActionResponse) {
    super("msdyn_ProductDeterminationProvisioningAction");
  }

  static fromResponse(data: unknown): msdyn_ProductDeterminationProvisioningActionResponse {
    return new msdyn_ProductDeterminationProvisioningActionResponse((data as any).value);
  }
}
