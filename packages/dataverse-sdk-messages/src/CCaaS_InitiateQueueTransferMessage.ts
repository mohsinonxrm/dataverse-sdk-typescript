import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateQueueTransfer message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateQueueTransferRequestParameters {
  QueueId: string;
  ApiVersion: string;
}

/**
 * CCaaS_InitiateQueueTransfer request message
 *
 * Web API Action: CCaaS_InitiateQueueTransfer
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateQueueTransferRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateQueueTransferResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateQueueTransferRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_InitiateQueueTransferRequestParameters
  ) {
    super("CCaaS_InitiateQueueTransfer", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateQueueTransfer`;

    const body = requestBody({
      QueueId: this.Parameters.QueueId,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateQueueTransferResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateQueueTransferResponse();
  }
}

/**
 * CCaaS_InitiateQueueTransfer response message
 */
export class CCaaS_InitiateQueueTransferResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateQueueTransfer");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateQueueTransferResponse {
    return new CCaaS_InitiateQueueTransferResponse();
  }
}
