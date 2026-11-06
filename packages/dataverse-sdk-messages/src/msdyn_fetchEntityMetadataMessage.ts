import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_fetchEntityMetadataResponse as msdyn_fetchEntityMetadataResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_fetchEntityMetadata message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_fetchEntityMetadataRequestParameters {
  fetchEntityMetadataRequest: string;
}

/**
 * msdyn_fetchEntityMetadata request message
 *
 * Web API Action: msdyn_fetchEntityMetadata
 */
export class msdyn_fetchEntityMetadataRequest
  extends OrganizationRequest
  implements Executable<msdyn_fetchEntityMetadataResponse>
{
  declare readonly Parameters: Readonly<msdyn_fetchEntityMetadataRequestParameters>;

  constructor(parameters: msdyn_fetchEntityMetadataRequestParameters) {
    super("msdyn_fetchEntityMetadata", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchEntityMetadata`;

    const body = requestBody({
      fetchEntityMetadataRequest: this.Parameters.fetchEntityMetadataRequest,
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

  async parseResponse(response: Response): Promise<msdyn_fetchEntityMetadataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_fetchEntityMetadataResponse.fromResponse({});
    return msdyn_fetchEntityMetadataResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_fetchEntityMetadata response message
 */
export class msdyn_fetchEntityMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_fetchEntityMetadataResponseData) {
    super("msdyn_fetchEntityMetadata");
  }

  static fromResponse(data: unknown): msdyn_fetchEntityMetadataResponse {
    return new msdyn_fetchEntityMetadataResponse(
      responseObject<msdyn_fetchEntityMetadataResponseData>(data)
    );
  }
}
