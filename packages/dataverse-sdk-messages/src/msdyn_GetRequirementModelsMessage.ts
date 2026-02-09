import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetRequirementModels request message
 *
 * Web API Action: msdyn_GetRequirementModels
 */
export class msdyn_GetRequirementModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRequirementModelsResponse>
{
  constructor(public attributes: string) {
    super("msdyn_GetRequirementModels");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementModels`;

    const body: Record<string, unknown> = {
      Attributes: this.attributes,
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementModelsResponse> {
    const data = await response.json();
    return msdyn_GetRequirementModelsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Attributes: this.attributes,
    };
  }
}

/**
 * msdyn_GetRequirementModels response message
 */
export class msdyn_GetRequirementModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementModelsResponse) {
    super("msdyn_GetRequirementModels");
  }

  static fromResponse(data: unknown): msdyn_GetRequirementModelsResponse {
    return new msdyn_GetRequirementModelsResponse((data as any).value);
  }
}
