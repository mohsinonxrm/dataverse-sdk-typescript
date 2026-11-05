import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SetBusinessEquipment request message
 *
 * Web API Action: SetBusinessEquipment
 */
export class SetBusinessEquipmentRequest
  extends OrganizationRequest
  implements Executable<SetBusinessEquipmentResponse>
{
  constructor(
    public equipmentId: string,
    public businessUnitId: string
  ) {
    super("SetBusinessEquipment");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetBusinessEquipment`;

    const body: Record<string, unknown> = {
      EquipmentId: this.equipmentId,
      BusinessUnitId: this.businessUnitId,
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

  async parseResponse(response: Response): Promise<SetBusinessEquipmentResponse> {
    // No return value (204 No Content)
    return new SetBusinessEquipmentResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EquipmentId: this.equipmentId,
      BusinessUnitId: this.businessUnitId,
    };
  }
}

/**
 * SetBusinessEquipment response message
 */
export class SetBusinessEquipmentResponse extends OrganizationResponse {
  constructor() {
    super("SetBusinessEquipment");
  }

  static fromResponse(_data: unknown): SetBusinessEquipmentResponse {
    return new SetBusinessEquipmentResponse();
  }
}
