import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_bookingsetupmetadata, msdyn_configuration } from "./types/index.js";

/**
 * Response from msdyn_initializedefaultclonequery action
 */
export interface msdyn_initializedefaultclonequeryResponse {
  value: msdyn_configuration;
}

/**
 * msdyn_initializedefaultclonequery action
 *
 * Unbound action
 */
export class msdyn_initializedefaultclonequeryAction implements Executable<msdyn_initializedefaultclonequeryResponse> {
  constructor(
    public readonly workType: msdyn_bookingsetupmetadata,
    public readonly configuration: msdyn_configuration
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_initializedefaultclonequery`;

    const body: Record<string, unknown> = {
      WorkType: this.workType,
      Configuration: this.configuration,
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

  async parseResponse(response: Response): Promise<msdyn_initializedefaultclonequeryResponse> {
    const data = await response.json();
    return data as msdyn_initializedefaultclonequeryResponse;
  }
}
