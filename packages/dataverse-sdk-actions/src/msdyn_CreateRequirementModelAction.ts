import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateRequirementModel action
 */
export interface msdyn_CreateRequirementModelResponse {
  Response: string;
}

/**
 * msdyn_CreateRequirementModel action
 *
 * Unbound action
 */
export class msdyn_CreateRequirementModelAction implements Executable<msdyn_CreateRequirementModelResponse> {
  constructor(
    public readonly attributes: string,
    public readonly from?: string,
    public readonly to?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateRequirementModel`;

    const body: Record<string, unknown> = {
      Attributes: this.attributes,
      From: this.from,
      To: this.to,
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

  async parseResponse(response: Response): Promise<msdyn_CreateRequirementModelResponse> {
    const data = await response.json();
    return data as msdyn_CreateRequirementModelResponse;
  }
}
