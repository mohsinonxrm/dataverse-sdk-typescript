import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetAllLeadPredictionModels request message
 *
 * Web API Action: msdyn_GetAllLeadPredictionModels
 */
export class msdyn_GetAllLeadPredictionModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAllLeadPredictionModelsResponse>
{
  constructor() {
    super("msdyn_GetAllLeadPredictionModels");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllLeadPredictionModels`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAllLeadPredictionModelsResponse> {
    const data = await response.json();
    return msdyn_GetAllLeadPredictionModelsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetAllLeadPredictionModels response message
 */
export class msdyn_GetAllLeadPredictionModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAllLeadPredictionModelsResponse) {
    super("msdyn_GetAllLeadPredictionModels");
  }

  static fromResponse(data: unknown): msdyn_GetAllLeadPredictionModelsResponse {
    return new msdyn_GetAllLeadPredictionModelsResponse((data as any).value);
  }
}
