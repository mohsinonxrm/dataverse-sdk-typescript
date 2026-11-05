import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_BusinessClosureSave action
 */
export interface msdyn_BusinessClosureSaveResponse {
  // No content returned
}

/**
 * msdyn_BusinessClosureSave action
 *
 * Unbound action
 */
export class msdyn_BusinessClosureSaveAction implements Executable<msdyn_BusinessClosureSaveResponse> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly start: string,
    public readonly end: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureSave`;

    const body: Record<string, unknown> = {
      Id: this.id,
      Name: this.name,
      Start: this.start,
      End: this.end,
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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureSaveResponse> {
    // No return value (204 No Content)
    return {};
  }
}
