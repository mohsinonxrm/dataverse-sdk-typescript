import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_GetIoTCommandMetadata request message
 *
 * Web API Action: msdyn_GetIoTCommandMetadata
 */
export class msdyn_GetIoTCommandMetadataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetIoTCommandMetadataResponse>
{
  constructor(public ioTCommandDefinition: EntityReference) {
    super("msdyn_GetIoTCommandMetadata");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIoTCommandMetadata`;

    const body: Record<string, unknown> = {
      IoTCommandDefinition: this.ioTCommandDefinition,
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

  async parseResponse(response: Response): Promise<msdyn_GetIoTCommandMetadataResponse> {
    const data = await response.json();
    return msdyn_GetIoTCommandMetadataResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      IoTCommandDefinition: this.ioTCommandDefinition,
    };
  }
}

/**
 * msdyn_GetIoTCommandMetadata response message
 */
export class msdyn_GetIoTCommandMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetIoTCommandMetadataResponse) {
    super("msdyn_GetIoTCommandMetadata");
  }

  static fromResponse(data: unknown): msdyn_GetIoTCommandMetadataResponse {
    return new msdyn_GetIoTCommandMetadataResponse((data as any).value);
  }
}
