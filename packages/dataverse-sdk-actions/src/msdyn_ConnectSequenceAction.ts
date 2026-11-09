import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ConnectSequence action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ConnectSequenceResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ConnectSequenceResponse;
  }
}
