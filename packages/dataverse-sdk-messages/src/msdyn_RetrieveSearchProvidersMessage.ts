import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_RetrieveSearchProvidersResponse as msdyn_RetrieveSearchProvidersResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveSearchProviders request message
 *
 * Web API Action: msdyn_RetrieveSearchProviders
 */
export class msdyn_RetrieveSearchProvidersRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveSearchProvidersResponse>
{
  constructor(public applicationId?: string) {
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrieveSearchProvidersResponse> {
    const data = await response.json();
    return msdyn_RetrieveSearchProvidersResponse.fromResponse(data);
  }
}

/**
 * msdyn_RetrieveSearchProviders response message
 */
export class msdyn_RetrieveSearchProvidersResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveSearchProvidersResponseData) {
    super("msdyn_RetrieveSearchProviders");
  }

  static fromResponse(data: unknown): msdyn_RetrieveSearchProvidersResponse {
    return new msdyn_RetrieveSearchProvidersResponse(
      responseObject<msdyn_RetrieveSearchProvidersResponseData>(data)
    );
  }
}
