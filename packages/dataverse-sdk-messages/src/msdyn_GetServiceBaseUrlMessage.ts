import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetServiceBaseUrlResponse as msdyn_GetServiceBaseUrlResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetServiceBaseUrl message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetServiceBaseUrlRequestParameters {
  AzureApplicationType: number;
  OrgMigratedToCoreServices?: boolean;
}

/**
 * msdyn_GetServiceBaseUrl request message
 *
 * Web API Action: msdyn_GetServiceBaseUrl
 */
export class msdyn_GetServiceBaseUrlRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetServiceBaseUrlResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetServiceBaseUrlRequestParameters>;

  constructor(parameters: msdyn_GetServiceBaseUrlRequestParameters) {
    super("msdyn_GetServiceBaseUrl", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetServiceBaseUrl`;

    const body = requestBody({
      AzureApplicationType: this.Parameters.AzureApplicationType,
      OrgMigratedToCoreServices: this.Parameters.OrgMigratedToCoreServices,
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

  async parseResponse(response: Response): Promise<msdyn_GetServiceBaseUrlResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetServiceBaseUrlResponse.fromResponse({});
    return msdyn_GetServiceBaseUrlResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetServiceBaseUrl response message
 */
export class msdyn_GetServiceBaseUrlResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetServiceBaseUrlResponseData) {
    super("msdyn_GetServiceBaseUrl");
  }

  static fromResponse(data: unknown): msdyn_GetServiceBaseUrlResponse {
    return new msdyn_GetServiceBaseUrlResponse(
      responseObject<msdyn_GetServiceBaseUrlResponseData>(data)
    );
  }
}
