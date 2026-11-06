import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_QueueItemOperationsOnLwiDeleteOrClosure message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_QueueItemOperationsOnLwiDeleteOrClosureRequestParameters {
  OperationType: string;
  QueueItemId: string;
}

/**
 * msdyn_QueueItemOperationsOnLwiDeleteOrClosure request message
 *
 * Web API Action: msdyn_QueueItemOperationsOnLwiDeleteOrClosure
 */
export class msdyn_QueueItemOperationsOnLwiDeleteOrClosureRequest
  extends OrganizationRequest
  implements Executable<msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse>
{
  declare readonly Parameters: Readonly<msdyn_QueueItemOperationsOnLwiDeleteOrClosureRequestParameters>;

  constructor(parameters: msdyn_QueueItemOperationsOnLwiDeleteOrClosureRequestParameters) {
    super("msdyn_QueueItemOperationsOnLwiDeleteOrClosure", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QueueItemOperationsOnLwiDeleteOrClosure`;

    const body = requestBody({
      OperationType: this.Parameters.OperationType,
      QueueItemId: this.Parameters.QueueItemId,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse());
  }
}

/**
 * msdyn_QueueItemOperationsOnLwiDeleteOrClosure response message
 */
export class msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_QueueItemOperationsOnLwiDeleteOrClosure");
  }

  static fromResponse(_data?: unknown): msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse {
    return new msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse();
  }
}
