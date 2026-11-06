import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SendEmailsToOptedInResourcesResponse as msdyn_SendEmailsToOptedInResourcesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SendEmailsToOptedInResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SendEmailsToOptedInResourcesRequestParameters {
  FromUserId: string;
  ToResourceIds: string;
}

/**
 * msdyn_SendEmailsToOptedInResources request message
 *
 * Web API Action: msdyn_SendEmailsToOptedInResources
 */
export class msdyn_SendEmailsToOptedInResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_SendEmailsToOptedInResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_SendEmailsToOptedInResourcesRequestParameters>;

  constructor(parameters: msdyn_SendEmailsToOptedInResourcesRequestParameters) {
    super("msdyn_SendEmailsToOptedInResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendEmailsToOptedInResources`;

    const body = requestBody({
      FromUserId: this.Parameters.FromUserId,
      ToResourceIds: this.Parameters.ToResourceIds,
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

  async parseResponse(response: Response): Promise<msdyn_SendEmailsToOptedInResourcesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SendEmailsToOptedInResourcesResponse.fromResponse(text ? JSON.parse(text) : {});
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
