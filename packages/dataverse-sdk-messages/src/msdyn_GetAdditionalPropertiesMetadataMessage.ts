import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetAdditionalPropertiesMetadata request message
 *
 * Web API Action: msdyn_GetAdditionalPropertiesMetadata
 */
export class msdyn_GetAdditionalPropertiesMetadataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAdditionalPropertiesMetadataResponse>
{
  constructor(public type: number) {
    super("msdyn_GetAdditionalPropertiesMetadata");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAdditionalPropertiesMetadata`;

    const body: Record<string, unknown> = {
      Type: this.type,
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

  async parseResponse(response: Response): Promise<msdyn_GetAdditionalPropertiesMetadataResponse> {
    const data = await response.json();
    return msdyn_GetAdditionalPropertiesMetadataResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Type: this.type,
    };
  }
}

/**
 * msdyn_GetAdditionalPropertiesMetadata response message
 */
export class msdyn_GetAdditionalPropertiesMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAdditionalPropertiesMetadataResponse) {
    super("msdyn_GetAdditionalPropertiesMetadata");
  }

  static fromResponse(data: unknown): msdyn_GetAdditionalPropertiesMetadataResponse {
    return new msdyn_GetAdditionalPropertiesMetadataResponse((data as any).value);
  }
}
