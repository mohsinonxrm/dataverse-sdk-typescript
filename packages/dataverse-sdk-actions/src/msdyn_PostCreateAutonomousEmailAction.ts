import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PostCreateAutonomousEmail action
 */
export interface msdyn_PostCreateAutonomousEmailResponse {
  // No content returned
}

/**
 * msdyn_PostCreateAutonomousEmail action
 *
 * Unbound action
 */
export class msdyn_PostCreateAutonomousEmailAction implements Executable<msdyn_PostCreateAutonomousEmailResponse> {
  constructor(public readonly emailGuid: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PostCreateAutonomousEmail`;

    const body: Record<string, unknown> = {
      EmailGuid: this.emailGuid,
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

  async parseResponse(response: Response): Promise<msdyn_PostCreateAutonomousEmailResponse> {
    // No return value (204 No Content)
    return {};
  }
}
