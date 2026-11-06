import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_autonomousCaseCreateUpdate action
 */
export interface msdyn_autonomousCaseCreateUpdateResponse {
  autonomousCaseResponse: string;
}

/**
 * msdyn_autonomousCaseCreateUpdate action
 *
 * Unbound action
 */
export class msdyn_autonomousCaseCreateUpdateAction implements Executable<msdyn_autonomousCaseCreateUpdateResponse> {
  constructor(
    public readonly autonomousCaseRequest: string,
    public readonly slot__conversation?: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_autonomousCaseCreateUpdate`;

    const body: Record<string, unknown> = {
      autonomousCaseRequest: this.autonomousCaseRequest,
      slot__conversation: this.slot__conversation,
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

  async parseResponse(response: Response): Promise<msdyn_autonomousCaseCreateUpdateResponse> {
    const data = await response.json();
    return data as msdyn_autonomousCaseCreateUpdateResponse;
  }
}
