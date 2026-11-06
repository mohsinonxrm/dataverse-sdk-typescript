import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ResetOmnichannelProvider message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ResetOmnichannelProviderRequestParameters {
  OrgBaseUrl: string;
}

/**
 * msdyn_ResetOmnichannelProvider request message
 *
 * Web API Action: msdyn_ResetOmnichannelProvider
 */
export class msdyn_ResetOmnichannelProviderRequest
  extends OrganizationRequest
  implements Executable<msdyn_ResetOmnichannelProviderResponse>
{
  declare readonly Parameters: Readonly<msdyn_ResetOmnichannelProviderRequestParameters>;

  constructor(parameters: msdyn_ResetOmnichannelProviderRequestParameters) {
    super("msdyn_ResetOmnichannelProvider", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResetOmnichannelProvider`;

    const body = requestBody({
      OrgBaseUrl: this.Parameters.OrgBaseUrl,
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
