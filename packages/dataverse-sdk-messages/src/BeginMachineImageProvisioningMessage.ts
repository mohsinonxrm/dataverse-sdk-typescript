import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { BeginMachineImageProvisioningResponse as BeginMachineImageProvisioningResponseData } from "./types/index.js";

/**
 * Parameters of the BeginMachineImageProvisioning message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BeginMachineImageProvisioningRequestParameters {
  sharedImageGalleryDestination: EntityReference | AnyEntityPayload;
  vmImageDescription?: string;
  vmImageName: string;
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
      sharedImageGalleryDestination: this.Parameters.sharedImageGalleryDestination,
      vmImageDescription: this.Parameters.vmImageDescription,
      vmImageName: this.Parameters.vmImageName,
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
    // 204 No Content is an empty result
    if (response.status === 204) return BeginMachineImageProvisioningResponse.fromResponse({});
    return BeginMachineImageProvisioningResponse.fromResponse(await response.json());
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
