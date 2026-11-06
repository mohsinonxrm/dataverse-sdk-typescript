import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from BeginMachineImageProvisioning action
 */
export interface BeginMachineImageProvisioningResponse {
  flowMachineImageId: string;
  flowMachineImageVersionId: string;
}

/**
 * Parameters of the BeginMachineImageProvisioning action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BeginMachineImageProvisioningActionParameters {
  sharedImageGalleryDestination: EntityReference | AnyEntityPayload;
  vmImageDescription?: string;
  vmImageName: string;
  machineImageSource: EntityReference | AnyEntityPayload;
}

/**
 * BeginMachineImageProvisioning action
 *
 * Unbound action
 */
export class BeginMachineImageProvisioningAction implements Executable<BeginMachineImageProvisioningResponse> {
  constructor(public readonly parameters: BeginMachineImageProvisioningActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BeginMachineImageProvisioning`;

    const body = requestBody({
      sharedImageGalleryDestination: this.parameters.sharedImageGalleryDestination,
      vmImageDescription: this.parameters.vmImageDescription,
      vmImageName: this.parameters.vmImageName,
      machineImageSource: this.parameters.machineImageSource,
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

  async parseResponse(response: Response): Promise<BeginMachineImageProvisioningResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as BeginMachineImageProvisioningResponse;
    return (await response.json()) as BeginMachineImageProvisioningResponse;
  }
}
