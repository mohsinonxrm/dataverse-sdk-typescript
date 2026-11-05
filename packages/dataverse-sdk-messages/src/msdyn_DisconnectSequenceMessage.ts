import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DisconnectSequence request message
 *
 * Web API Action: msdyn_DisconnectSequence
 */
export class msdyn_DisconnectSequenceRequest
  extends OrganizationRequest
  implements Executable<msdyn_DisconnectSequenceResponse>
{
  constructor(
    public regardingEntityId: string,
    public regardingEntityName: string,
    public sequenceTargetId: string
  ) {
    super("msdyn_DisconnectSequence");
  }

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
    return new msdyn_DisconnectSequenceResponse();
  }
}

/**
 * msdyn_DisconnectSequence response message
 */
export class msdyn_DisconnectSequenceResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_DisconnectSequence");
  }

  static fromResponse(_data: unknown): msdyn_DisconnectSequenceResponse {
    return new msdyn_DisconnectSequenceResponse();
  }
}
