import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveSearchProvidersResponse as msdyn_RetrieveSearchProvidersResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveSearchProviders message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveSearchProvidersRequestParameters {
  ApplicationId?: string;
}

/**
 * msdyn_RetrieveSearchProviders request message
 *
 * Web API Action: msdyn_RetrieveSearchProviders
 */
export class msdyn_RetrieveSearchProvidersRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveSearchProvidersResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveSearchProvidersRequestParameters>;

  constructor(parameters: msdyn_RetrieveSearchProvidersRequestParameters = {}) {
    super("msdyn_RetrieveSearchProviders", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveSearchProviders`;

    const body = requestBody({
      ApplicationId: this.Parameters.ApplicationId,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveSearchProvidersResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RetrieveSearchProvidersResponse.fromResponse({});
    return msdyn_RetrieveSearchProvidersResponse.fromResponse(await response.json());
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
