import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ActionCardCreate action
 */
export interface msdyn_ActionCardCreateResponse {
  // No content returned
}

/**
 * msdyn_ActionCardCreate action
 *
 * Unbound action
 */
export class msdyn_ActionCardCreateAction implements Executable<msdyn_ActionCardCreateResponse> {
  constructor(public readonly actionCardCreateParams: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActionCardCreate`;

    const body: Record<string, unknown> = {
      actionCardCreateParams: this.actionCardCreateParams,
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

  async parseResponse(response: Response): Promise<msdyn_ActionCardCreateResponse> {
    // No return value (204 No Content)
    return {};
  }
}
