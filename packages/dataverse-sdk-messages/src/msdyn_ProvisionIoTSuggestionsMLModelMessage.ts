import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ProvisionIoTSuggestionsMLModel request message
 *
 * Web API Action: msdyn_ProvisionIoTSuggestionsMLModel
 */
export class msdyn_ProvisionIoTSuggestionsMLModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProvisionIoTSuggestionsMLModelResponse>
{
  constructor() {
    super("msdyn_ProvisionIoTSuggestionsMLModel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionIoTSuggestionsMLModel`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ProvisionIoTSuggestionsMLModelResponse> {
    // No return value (204 No Content)
    return new msdyn_ProvisionIoTSuggestionsMLModelResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_ProvisionIoTSuggestionsMLModel response message
 */
export class msdyn_ProvisionIoTSuggestionsMLModelResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ProvisionIoTSuggestionsMLModel");
  }

  static fromResponse(_data: unknown): msdyn_ProvisionIoTSuggestionsMLModelResponse {
    return new msdyn_ProvisionIoTSuggestionsMLModelResponse();
  }
}
