import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { BeginMachineImageProvisioningResponse as BeginMachineImageProvisioningResponseData } from "./types/index.js";

/**
 * Parameters of the BeginMachineImageProvisioning message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BeginMachineImageProvisioningRequestParameters {
  vmImageDescription?: string;
  vmImageName: string;
  sharedImageGalleryDestination: EntityReference | AnyEntityPayload;
  machineImageSource: EntityReference | AnyEntityPayload;
}

/**
 * BeginMachineImageProvisioning request message
 *
 * Web API Action: BeginMachineImageProvisioning
 */
export class BeginMachineImageProvisioningRequest
  extends OrganizationRequest
  implements Executable<BeginMachineImageProvisioningResponse>
{
  declare readonly Parameters: Readonly<BeginMachineImageProvisioningRequestParameters>;

  constructor(parameters: BeginMachineImageProvisioningRequestParameters) {
    super("BeginMachineImageProvisioning", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BeginMachineImageProvisioning`;

    const body = requestBody({
      vmImageDescription: this.Parameters.vmImageDescription,
      vmImageName: this.Parameters.vmImageName,
      sharedImageGalleryDestination: this.Parameters.sharedImageGalleryDestination,
      machineImageSource: this.Parameters.machineImageSource,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return BeginMachineImageProvisioningResponse.fromResponse(text ? JSON.parse(text) : {});
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
