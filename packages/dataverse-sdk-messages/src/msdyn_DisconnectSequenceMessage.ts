import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DisconnectSequence message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DisconnectSequenceRequestParameters {
  RegardingEntityId?: string;
  RegardingEntityName?: string;
  SequenceTargetId?: string;
}

/**
 * msdyn_DisconnectSequence request message
 *
 * Web API Action: msdyn_DisconnectSequence
 */
export class msdyn_DisconnectSequenceRequest
  extends OrganizationRequest
  implements Executable<msdyn_DisconnectSequenceResponse>
{
  declare readonly Parameters: Readonly<msdyn_DisconnectSequenceRequestParameters>;

  constructor(parameters: msdyn_DisconnectSequenceRequestParameters = {}) {
    super("msdyn_DisconnectSequence", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DisconnectSequence`;

    const body = requestBody({
      RegardingEntityId: this.Parameters.RegardingEntityId,
      RegardingEntityName: this.Parameters.RegardingEntityName,
      SequenceTargetId: this.Parameters.SequenceTargetId,
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

  parseResponse(_response: Response): Promise<msdyn_DisconnectSequenceResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_DisconnectSequenceResponse());
  }
}

/**
 * msdyn_DisconnectSequence response message
 */
export class msdyn_DisconnectSequenceResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_DisconnectSequence");
  }

  static fromResponse(_data?: unknown): msdyn_DisconnectSequenceResponse {
    return new msdyn_DisconnectSequenceResponse();
  }
}
