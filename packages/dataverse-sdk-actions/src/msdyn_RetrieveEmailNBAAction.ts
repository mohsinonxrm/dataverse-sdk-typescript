import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrieveEmailNBA action
 */
export interface msdyn_RetrieveEmailNBAResponse {
  msdyn_result: string;
}

/**
 * msdyn_RetrieveEmailNBA action
 *
 * Unbound action
 */
export class msdyn_RetrieveEmailNBAAction implements Executable<msdyn_RetrieveEmailNBAResponse> {
  constructor(
    public readonly msdyn_RegardingEntityIds: string,
    public readonly msdyn_RegardingLogicalName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEmailNBA`;

    const body: Record<string, unknown> = {
      msdyn_RegardingEntityIds: this.msdyn_RegardingEntityIds,
      msdyn_RegardingLogicalName: this.msdyn_RegardingLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveEmailNBAResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveEmailNBAResponse;
  }
}
