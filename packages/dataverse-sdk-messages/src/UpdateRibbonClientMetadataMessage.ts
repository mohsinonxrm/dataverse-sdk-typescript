import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UpdateRibbonClientMetadata request message
 *
 * Web API Action: UpdateRibbonClientMetadata
 */
export class UpdateRibbonClientMetadataRequest
  extends OrganizationRequest
  implements Executable<UpdateRibbonClientMetadataResponse>
{
  constructor() {
    super("UpdateRibbonClientMetadata");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateRibbonClientMetadata`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<UpdateRibbonClientMetadataResponse> {
    // No return value (204 No Content)
    return new UpdateRibbonClientMetadataResponse();
  }
}

/**
 * UpdateRibbonClientMetadata response message
 */
export class UpdateRibbonClientMetadataResponse extends OrganizationResponse {
  constructor() {
    super("UpdateRibbonClientMetadata");
  }

  static fromResponse(_data: unknown): UpdateRibbonClientMetadataResponse {
    return new UpdateRibbonClientMetadataResponse();
  }
}
