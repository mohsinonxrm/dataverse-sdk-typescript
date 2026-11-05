import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ConnectSequenceResponse as msdyn_ConnectSequenceResponseData } from "./types/index.js";

/**
 * msdyn_ConnectSequence request message
 *
 * Web API Action: msdyn_ConnectSequence
 */
export class msdyn_ConnectSequenceRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConnectSequenceResponse>
{
  constructor(
    public regardingEntityId: string,
    public regardingEntityName: string,
    public sequenceId: string,
    public segmentId: string,
    public source: string,
    public waitTime: number,
    public advancedToOtherSequenceTargetStepId: string,
    public ownerEntityId: string,
    public ownerEntityName: string
  ) {
    super("msdyn_ConnectSequence");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ConnectSequenceResponse> {
    const data = await response.json();
    return msdyn_ConnectSequenceResponse.fromResponse(data);
  }
}

/**
 * msdyn_ConnectSequence response message
 */
export class msdyn_ConnectSequenceResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConnectSequenceResponseData) {
    super("msdyn_ConnectSequence");
  }

  static fromResponse(data: unknown): msdyn_ConnectSequenceResponse {
    return new msdyn_ConnectSequenceResponse(
      responseObject<msdyn_ConnectSequenceResponseData>(data)
    );
  }
}
