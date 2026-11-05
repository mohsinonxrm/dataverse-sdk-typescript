import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ShouldEnableRoutingCommand action
 */
export interface msdyn_ShouldEnableRoutingCommandResponse {
  EnableRoutingCommand: boolean;
}

/**
 * msdyn_ShouldEnableRoutingCommand action
 *
 * Unbound action
 */
export class msdyn_ShouldEnableRoutingCommandAction implements Executable<msdyn_ShouldEnableRoutingCommandResponse> {
  constructor(public readonly entityLogicalName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ShouldEnableRoutingCommand`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_ShouldEnableRoutingCommandResponse> {
    const data = await response.json();
    return data as msdyn_ShouldEnableRoutingCommandResponse;
  }
}
