import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RetrieveSearchProviders request message
 *
 * Web API Action: msdyn_RetrieveSearchProviders
 */
export class msdyn_RetrieveSearchProvidersRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveSearchProvidersResponse>
{
  constructor(public applicationId: string) {
    super("msdyn_RetrieveSearchProviders");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveSearchProviders`;

    const body: Record<string, unknown> = {
      ApplicationId: this.applicationId,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveSearchProvidersResponse> {
    const data = await response.json();
    return msdyn_RetrieveSearchProvidersResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ApplicationId: this.applicationId,
    };
  }
}

/**
 * msdyn_RetrieveSearchProviders response message
 */
export class msdyn_RetrieveSearchProvidersResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveSearchProvidersResponse) {
    super("msdyn_RetrieveSearchProviders");
  }

  static fromResponse(data: unknown): msdyn_RetrieveSearchProvidersResponse {
    return new msdyn_RetrieveSearchProvidersResponse((data as any).value);
  }
}
