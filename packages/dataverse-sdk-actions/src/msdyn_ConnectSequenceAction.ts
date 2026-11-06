import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ConnectSequence action
 */
export interface msdyn_ConnectSequenceResponse {
  SequenceTargetId: string;
}

/**
 * Parameters of the msdyn_ConnectSequence action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConnectSequenceActionParameters {
  RegardingEntityId: string;
  RegardingEntityName: string;
  SequenceId: string;
  SegmentId?: string;
  Source?: string;
  WaitTime?: number;
  AdvancedToOtherSequenceTargetStepId?: string;
  OwnerEntityId?: string;
  OwnerEntityName?: string;
}

/**
 * msdyn_ConnectSequence action
 *
 * Unbound action
 */
export class msdyn_ConnectSequenceAction implements Executable<msdyn_ConnectSequenceResponse> {
  constructor(public readonly parameters: msdyn_ConnectSequenceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConnectSequence`;

    const body = requestBody({
      RegardingEntityId: this.parameters.RegardingEntityId,
      RegardingEntityName: this.parameters.RegardingEntityName,
      SequenceId: this.parameters.SequenceId,
      SegmentId: this.parameters.SegmentId,
      Source: this.parameters.Source,
      WaitTime: this.parameters.WaitTime,
      AdvancedToOtherSequenceTargetStepId: this.parameters.AdvancedToOtherSequenceTargetStepId,
      OwnerEntityId: this.parameters.OwnerEntityId,
      OwnerEntityName: this.parameters.OwnerEntityName,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ConnectSequenceResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ConnectSequenceResponse;
  }
}
