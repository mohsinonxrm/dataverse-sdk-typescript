import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ResetOmnichannelProvider request message
 *
 * Web API Action: msdyn_ResetOmnichannelProvider
 */
export class msdyn_ResetOmnichannelProviderRequest
  extends OrganizationRequest
  implements Executable<msdyn_ResetOmnichannelProviderResponse>
{
  constructor(public orgBaseUrl: string) {
    super("msdyn_ResetOmnichannelProvider");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResetOmnichannelProvider`;

    const body: Record<string, unknown> = {
      OrgBaseUrl: this.orgBaseUrl,
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

  async parseResponse(response: Response): Promise<msdyn_ResetOmnichannelProviderResponse> {
    // No return value (204 No Content)
    return new msdyn_ResetOmnichannelProviderResponse();
  }
}

/**
 * msdyn_ResetOmnichannelProvider response message
 */
export class msdyn_ResetOmnichannelProviderResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ResetOmnichannelProvider");
  }

  static fromResponse(_data: unknown): msdyn_ResetOmnichannelProviderResponse {
    return new msdyn_ResetOmnichannelProviderResponse();
  }
}
