import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { BeginMachineImageProvisioningResponse as BeginMachineImageProvisioningResponseData } from "./types/index.js";

/**
 * BeginMachineImageProvisioning request message
 *
 * Web API Action: BeginMachineImageProvisioning
 */
export class BeginMachineImageProvisioningRequest
  extends OrganizationRequest
  implements Executable<BeginMachineImageProvisioningResponse>
{
  constructor(
    public vmImageDescription: string | undefined,
    public vmImageName: string,
    public sharedImageGalleryDestination: EntityReference | AnyEntityPayload,
    public machineImageSource: EntityReference | AnyEntityPayload
  ) {
    super("BeginMachineImageProvisioning");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BeginMachineImageProvisioning`;

    const body: Record<string, unknown> = {
      vmImageDescription: this.vmImageDescription,
      vmImageName: this.vmImageName,
      sharedImageGalleryDestination: this.sharedImageGalleryDestination,
      machineImageSource: this.machineImageSource,
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

  async parseResponse(response: Response): Promise<BeginMachineImageProvisioningResponse> {
    const data = await response.json();
    return BeginMachineImageProvisioningResponse.fromResponse(data);
  }
}

/**
 * BeginMachineImageProvisioning response message
 */
export class BeginMachineImageProvisioningResponse extends OrganizationResponse {
  constructor(public result: BeginMachineImageProvisioningResponseData) {
    super("BeginMachineImageProvisioning");
  }

  static fromResponse(data: unknown): BeginMachineImageProvisioningResponse {
    return new BeginMachineImageProvisioningResponse(
      responseObject<BeginMachineImageProvisioningResponseData>(data)
    );
  }
}
