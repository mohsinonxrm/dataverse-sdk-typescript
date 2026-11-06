import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SendEmailsToOptedInResourcesResponse as msdyn_SendEmailsToOptedInResourcesResponseData } from "./types/index.js";

/**
 * msdyn_SendEmailsToOptedInResources request message
 *
 * Web API Action: msdyn_SendEmailsToOptedInResources
 */
export class msdyn_SendEmailsToOptedInResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_SendEmailsToOptedInResourcesResponse>
{
  constructor(
    public fromUserId: string,
    public toResourceIds: string
  ) {
    super("msdyn_SendEmailsToOptedInResources");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendEmailsToOptedInResources`;

    const body: Record<string, unknown> = {
      FromUserId: this.fromUserId,
      ToResourceIds: this.toResourceIds,
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

  async parseResponse(response: Response): Promise<msdyn_SendEmailsToOptedInResourcesResponse> {
    const data = await response.json();
    return msdyn_SendEmailsToOptedInResourcesResponse.fromResponse(data);
  }
}

/**
 * msdyn_SendEmailsToOptedInResources response message
 */
export class msdyn_SendEmailsToOptedInResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_SendEmailsToOptedInResourcesResponseData) {
    super("msdyn_SendEmailsToOptedInResources");
  }

  static fromResponse(data: unknown): msdyn_SendEmailsToOptedInResourcesResponse {
    return new msdyn_SendEmailsToOptedInResourcesResponse(
      responseObject<msdyn_SendEmailsToOptedInResourcesResponseData>(data)
    );
  }
}
