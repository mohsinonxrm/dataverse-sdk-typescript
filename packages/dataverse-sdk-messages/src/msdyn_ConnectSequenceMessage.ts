import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ConnectSequenceResponse as msdyn_ConnectSequenceResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ConnectSequence message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConnectSequenceRequestParameters {
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
 * msdyn_ConnectSequence request message
 *
 * Web API Action: msdyn_ConnectSequence
 */
export class msdyn_ConnectSequenceRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConnectSequenceResponse>
{
  declare readonly Parameters: Readonly<msdyn_ConnectSequenceRequestParameters>;

  constructor(parameters: msdyn_ConnectSequenceRequestParameters) {
    super("msdyn_ConnectSequence", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConnectSequence`;

    const body = requestBody({
      RegardingEntityId: this.Parameters.RegardingEntityId,
      RegardingEntityName: this.Parameters.RegardingEntityName,
      SequenceId: this.Parameters.SequenceId,
      SegmentId: this.Parameters.SegmentId,
      Source: this.Parameters.Source,
      WaitTime: this.Parameters.WaitTime,
      AdvancedToOtherSequenceTargetStepId: this.Parameters.AdvancedToOtherSequenceTargetStepId,
      OwnerEntityId: this.Parameters.OwnerEntityId,
      OwnerEntityName: this.Parameters.OwnerEntityName,
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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ConnectSequenceResponse.fromResponse({});
    return msdyn_ConnectSequenceResponse.fromResponse(await response.json());
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
