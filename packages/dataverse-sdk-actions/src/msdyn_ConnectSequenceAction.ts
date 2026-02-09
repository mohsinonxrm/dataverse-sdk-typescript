import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ConnectSequence action
 */
export interface msdyn_ConnectSequenceResponse {
  SequenceTargetId: string;
}

/**
 * msdyn_ConnectSequence action
 *
 * Unbound action
 */
export class msdyn_ConnectSequenceAction implements Executable<msdyn_ConnectSequenceResponse> {
  constructor(
    public readonly regardingEntityId: string,
    public readonly regardingEntityName: string,
    public readonly sequenceId: string,
    public readonly segmentId: string,
    public readonly source: string,
    public readonly waitTime: number,
    public readonly advancedToOtherSequenceTargetStepId: string,
    public readonly ownerEntityId: string,
    public readonly ownerEntityName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConnectSequence`;

    const body: Record<string, unknown> = {
      RegardingEntityId: this.regardingEntityId,
      RegardingEntityName: this.regardingEntityName,
      SequenceId: this.sequenceId,
      SegmentId: this.segmentId,
      Source: this.source,
      WaitTime: this.waitTime,
      AdvancedToOtherSequenceTargetStepId: this.advancedToOtherSequenceTargetStepId,
      OwnerEntityId: this.ownerEntityId,
      OwnerEntityName: this.ownerEntityName,
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

  async parseResponse(response: Response): Promise<msdyn_ConnectSequenceResponse> {
    const data = await response.json();
    return data as msdyn_ConnectSequenceResponse;
  }
}
