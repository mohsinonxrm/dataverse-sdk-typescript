import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SetBusinessEquipment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetBusinessEquipmentRequestParameters {
  EquipmentId: string;
  BusinessUnitId: string;
}

/**
 * SetBusinessEquipment request message
 *
 * Web API Action: SetBusinessEquipment
 */
export class SetBusinessEquipmentRequest
  extends OrganizationRequest
  implements Executable<SetBusinessEquipmentResponse>
{
  declare readonly Parameters: Readonly<SetBusinessEquipmentRequestParameters>;

  constructor(parameters: SetBusinessEquipmentRequestParameters) {
    super("SetBusinessEquipment", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetBusinessEquipment`;

    const body = requestBody({
      EquipmentId: this.Parameters.EquipmentId,
      BusinessUnitId: this.Parameters.BusinessUnitId,
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

  parseResponse(_response: Response): Promise<SetBusinessEquipmentResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new SetBusinessEquipmentResponse());
  }
}

/**
 * SetBusinessEquipment response message
 */
export class SetBusinessEquipmentResponse extends OrganizationResponse {
  constructor() {
    super("SetBusinessEquipment");
  }

  static fromResponse(_data?: unknown): SetBusinessEquipmentResponse {
    return new SetBusinessEquipmentResponse();
  }
}
