import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SetBusinessEquipment action
 */
export interface SetBusinessEquipmentResponse {
  // No content returned
}

/**
 * SetBusinessEquipment action
 *
 * Unbound action
 */
export class SetBusinessEquipmentAction implements Executable<SetBusinessEquipmentResponse> {
  constructor(
    public readonly equipmentId: string,
    public readonly businessUnitId: string
  ) {}

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
    return {};
  }
}
