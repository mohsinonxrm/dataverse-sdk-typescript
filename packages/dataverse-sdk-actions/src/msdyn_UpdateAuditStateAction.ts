import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateAuditState action
 */
export interface msdyn_UpdateAuditStateResponse {
  // No content returned
}

/**
 * msdyn_UpdateAuditState action
 *
 * Unbound action
 */
export class msdyn_UpdateAuditStateAction implements Executable<msdyn_UpdateAuditStateResponse> {
  constructor(public readonly msdyn_input: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateAuditState`;

    const body: Record<string, unknown> = {
      msdyn_input: this.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateAuditStateResponse> {
    // No return value (204 No Content)
    return {};
  }
}
