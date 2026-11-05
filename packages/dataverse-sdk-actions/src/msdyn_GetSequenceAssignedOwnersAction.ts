import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSequenceAssignedOwners action
 */
export interface msdyn_GetSequenceAssignedOwnersResponse {
  SequenceAssignedOwners: string;
}

/**
 * msdyn_GetSequenceAssignedOwners action
 *
 * Unbound action
 */
export class msdyn_GetSequenceAssignedOwnersAction implements Executable<msdyn_GetSequenceAssignedOwnersResponse> {
  constructor(
    public readonly regardingEntityId: string,
    public readonly regardingEntityName: string,
    public readonly sequenceIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSequenceAssignedOwners`;

    const body: Record<string, unknown> = {
      RegardingEntityId: this.regardingEntityId,
      RegardingEntityName: this.regardingEntityName,
      SequenceIds: this.sequenceIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetSequenceAssignedOwnersResponse> {
    const data = await response.json();
    return data as msdyn_GetSequenceAssignedOwnersResponse;
  }
}
