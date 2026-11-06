import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return BeginMachineImageProvisioningResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the BeginMachineImageProvisioning action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface BeginMachineImageProvisioningResult {
  "@odata.context"?: string;
  flowMachineImageId: string;
  flowMachineImageVersionId: string;
}

/**
 * BeginMachineImageProvisioning response message
 *
 * `result` is the value the BeginMachineImageProvisioning action returns (see {@link BeginMachineImageProvisioningResult}).
 */
export class BeginMachineImageProvisioningResponse extends OrganizationResponse {
  constructor(public result: BeginMachineImageProvisioningResult) {
    super("BeginMachineImageProvisioning");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): BeginMachineImageProvisioningResponse {
    return new BeginMachineImageProvisioningResponse(data as BeginMachineImageProvisioningResult);
  }
}
