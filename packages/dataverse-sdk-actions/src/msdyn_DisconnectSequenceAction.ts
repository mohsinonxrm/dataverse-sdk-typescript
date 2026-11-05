import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DisconnectSequence action
 */
export interface msdyn_DisconnectSequenceResponse {
  // No content returned
}

/**
 * msdyn_DisconnectSequence action
 *
 * Unbound action
 */
export class msdyn_DisconnectSequenceAction implements Executable<msdyn_DisconnectSequenceResponse> {
  constructor(
    public readonly regardingEntityId: string,
    public readonly regardingEntityName: string,
    public readonly sequenceTargetId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DisconnectSequence`;

    const body: Record<string, unknown> = {
      RegardingEntityId: this.regardingEntityId,
      RegardingEntityName: this.regardingEntityName,
      SequenceTargetId: this.sequenceTargetId,
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

  async parseResponse(response: Response): Promise<msdyn_DisconnectSequenceResponse> {
    // No return value (204 No Content)
    return {};
  }
}
