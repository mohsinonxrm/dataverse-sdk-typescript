import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from CreateRpaBox action
 */
export interface CreateRpaBoxResponse {
  flowMachineId: string;
}

/**
 * CreateRpaBox action
 *
 * Unbound action
 */
export class CreateRpaBoxAction implements Executable<CreateRpaBoxResponse> {
  constructor(
    public readonly machineDescription: string | undefined,
    public readonly machineNetworkId: EntityReference | AnyEntityPayload | undefined,
    public readonly machineName: string,
    public readonly machineImageVersionId: EntityReference | AnyEntityPayload
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateRpaBox`;

    const body: Record<string, unknown> = {
      machineDescription: this.machineDescription,
      machineNetworkId: this.machineNetworkId,
      machineName: this.machineName,
      machineImageVersionId: this.machineImageVersionId,
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

  async parseResponse(response: Response): Promise<CreateRpaBoxResponse> {
    const data = await response.json();
    return data as CreateRpaBoxResponse;
  }
}
