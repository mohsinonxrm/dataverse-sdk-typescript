import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CreateRequirementModelResponse as msdyn_CreateRequirementModelResponseData } from "./types/index.js";

/**
 * msdyn_CreateRequirementModel request message
 *
 * Web API Action: msdyn_CreateRequirementModel
 */
export class msdyn_CreateRequirementModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateRequirementModelResponse>
{
  constructor(
    public attributes: string,
    public from: string,
    public to: string
  ) {
    super("msdyn_CreateRequirementModel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateRequirementModel`;

    const body: Record<string, unknown> = {
      Attributes: this.attributes,
      From: this.from,
      To: this.to,
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

  async parseResponse(response: Response): Promise<msdyn_CreateRequirementModelResponse> {
    const data = await response.json();
    return msdyn_CreateRequirementModelResponse.fromResponse(data);
  }
}

/**
 * msdyn_CreateRequirementModel response message
 */
export class msdyn_CreateRequirementModelResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateRequirementModelResponseData) {
    super("msdyn_CreateRequirementModel");
  }

  static fromResponse(data: unknown): msdyn_CreateRequirementModelResponse {
    return new msdyn_CreateRequirementModelResponse(
      responseObject<msdyn_CreateRequirementModelResponseData>(data)
    );
  }
}
