import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ProvisionIoTSuggestionsMLModelInternal message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProvisionIoTSuggestionsMLModelInternalRequestParameters {
  TenantId: string;
}

/**
 * msdyn_ProvisionIoTSuggestionsMLModelInternal request message
 *
 * Web API Action: msdyn_ProvisionIoTSuggestionsMLModelInternal
 */
export class msdyn_ProvisionIoTSuggestionsMLModelInternalRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProvisionIoTSuggestionsMLModelInternalResponse>
{
  declare readonly Parameters: Readonly<msdyn_ProvisionIoTSuggestionsMLModelInternalRequestParameters>;

  constructor(parameters: msdyn_ProvisionIoTSuggestionsMLModelInternalRequestParameters) {
    super("msdyn_ProvisionIoTSuggestionsMLModelInternal", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionIoTSuggestionsMLModelInternal`;

    const body = requestBody({
      TenantId: this.Parameters.TenantId,
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
  ): Promise<msdyn_ProvisionIoTSuggestionsMLModelInternalResponse> {
    // No return value (204 No Content)
    return new msdyn_ProvisionIoTSuggestionsMLModelInternalResponse();
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
