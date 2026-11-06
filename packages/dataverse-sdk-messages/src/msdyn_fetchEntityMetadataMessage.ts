import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_fetchEntityMetadataResponse as msdyn_fetchEntityMetadataResponseData } from "./types/index.js";

/**
 * msdyn_fetchEntityMetadata request message
 *
 * Web API Action: msdyn_fetchEntityMetadata
 */
export class msdyn_fetchEntityMetadataRequest
  extends OrganizationRequest
  implements Executable<msdyn_fetchEntityMetadataResponse>
{
  constructor(public fetchEntityMetadataRequest: string) {
    super("msdyn_fetchEntityMetadata");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchEntityMetadata`;

    const body: Record<string, unknown> = {
      fetchEntityMetadataRequest: this.fetchEntityMetadataRequest,
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

  async parseResponse(response: Response): Promise<msdyn_fetchEntityMetadataResponse> {
    const data = await response.json();
    return msdyn_fetchEntityMetadataResponse.fromResponse(data);
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
