import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ProvisionIoTSuggestionsMLModelInternal request message
 *
 * Web API Action: msdyn_ProvisionIoTSuggestionsMLModelInternal
 */
export class msdyn_ProvisionIoTSuggestionsMLModelInternalRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProvisionIoTSuggestionsMLModelInternalResponse>
{
  constructor(public tenantId: string) {
    super("msdyn_ProvisionIoTSuggestionsMLModelInternal");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionIoTSuggestionsMLModelInternal`;

    const body: Record<string, unknown> = {
      TenantId: this.tenantId,
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
  ): Promise<msdyn_ProvisionIoTSuggestionsMLModelInternalResponse> {
    // No return value (204 No Content)
    return new msdyn_ProvisionIoTSuggestionsMLModelInternalResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      TenantId: this.tenantId,
    };
  }
}

/**
 * msdyn_ProvisionIoTSuggestionsMLModelInternal response message
 */
export class msdyn_ProvisionIoTSuggestionsMLModelInternalResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ProvisionIoTSuggestionsMLModelInternal");
  }

  static fromResponse(_data: unknown): msdyn_ProvisionIoTSuggestionsMLModelInternalResponse {
    return new msdyn_ProvisionIoTSuggestionsMLModelInternalResponse();
  }
}
