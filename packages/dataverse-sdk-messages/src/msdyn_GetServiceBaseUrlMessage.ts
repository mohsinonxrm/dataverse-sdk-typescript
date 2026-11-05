import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetServiceBaseUrl request message
 *
 * Web API Action: msdyn_GetServiceBaseUrl
 */
export class msdyn_GetServiceBaseUrlRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetServiceBaseUrlResponse>
{
  constructor(
    public azureApplicationType: number,
    public orgMigratedToCoreServices: boolean
  ) {
    super("msdyn_GetServiceBaseUrl");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetServiceBaseUrl`;

    const body: Record<string, unknown> = {
      AzureApplicationType: this.azureApplicationType,
      OrgMigratedToCoreServices: this.orgMigratedToCoreServices,
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

  async parseResponse(response: Response): Promise<msdyn_GetServiceBaseUrlResponse> {
    const data = await response.json();
    return msdyn_GetServiceBaseUrlResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AzureApplicationType: this.azureApplicationType,
      OrgMigratedToCoreServices: this.orgMigratedToCoreServices,
    };
  }
}

/**
 * msdyn_GetServiceBaseUrl response message
 */
export class msdyn_GetServiceBaseUrlResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetServiceBaseUrlResponse) {
    super("msdyn_GetServiceBaseUrl");
  }

  static fromResponse(data: unknown): msdyn_GetServiceBaseUrlResponse {
    return new msdyn_GetServiceBaseUrlResponse((data as any).value);
  }
}
