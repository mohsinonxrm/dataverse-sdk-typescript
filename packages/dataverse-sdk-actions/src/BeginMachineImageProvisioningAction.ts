import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from BeginMachineImageProvisioning action
 */
export interface BeginMachineImageProvisioningResponse {
  flowMachineImageVersionId: string;
  flowMachineImageId: string;
}

/**
 * BeginMachineImageProvisioning action
 *
 * Unbound action
 */
export class BeginMachineImageProvisioningAction implements Executable<BeginMachineImageProvisioningResponse> {
  constructor(
    public readonly vmImageDescription: string,
    public readonly vmImageName: string,
    public readonly sharedImageGalleryDestination: EntityReference,
    public readonly machineImageSource: EntityReference
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<BeginMachineImageProvisioningResponse> {
    const data = await response.json();
    return data as BeginMachineImageProvisioningResponse;
  }
}
