import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UserOptOutActor action
 */
export interface msdyn_UserOptOutActorResponse {
  // No content returned
}

/**
 * msdyn_UserOptOutActor action
 *
 * Unbound action
 */
export class msdyn_UserOptOutActorAction implements Executable<msdyn_UserOptOutActorResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UserOptOutActor`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_UserOptOutActorResponse> {
    // No return value (204 No Content)
    return {};
  }
}
