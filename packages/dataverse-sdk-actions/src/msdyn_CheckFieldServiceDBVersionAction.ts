import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckFieldServiceDBVersion action
 */
export interface msdyn_CheckFieldServiceDBVersionResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
  HelpLink: string;
}

/**
 * msdyn_CheckFieldServiceDBVersion action
 *
 * Unbound action
 */
export class msdyn_CheckFieldServiceDBVersionAction implements Executable<msdyn_CheckFieldServiceDBVersionResponse> {
  constructor(public readonly expectedDBVersion: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckFieldServiceDBVersion`;

    const body: Record<string, unknown> = {
      ExpectedDBVersion: this.expectedDBVersion,
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

  async parseResponse(response: Response): Promise<msdyn_CheckFieldServiceDBVersionResponse> {
    const data = await response.json();
    return data as msdyn_CheckFieldServiceDBVersionResponse;
  }
}
