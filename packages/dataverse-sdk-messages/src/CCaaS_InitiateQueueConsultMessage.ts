import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateQueueConsult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateQueueConsultRequestParameters {
  ApiVersion: string;
  ConversationAccess: string;
  QueueId: string;
  ConsultType: string;
}

/**
 * CCaaS_InitiateQueueConsult request message
 *
 * Web API Action: CCaaS_InitiateQueueConsult
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateQueueConsultRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateQueueConsultResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateQueueConsultRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_InitiateQueueConsultRequestParameters
  ) {
    super("CCaaS_InitiateQueueConsult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateQueueConsult`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      ConversationAccess: this.Parameters.ConversationAccess,
      QueueId: this.Parameters.QueueId,
      ConsultType: this.Parameters.ConsultType,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateQueueConsultResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateQueueConsultResponse();
  }
}

/**
 * CCaaS_InitiateQueueConsult response message
 */
export class CCaaS_InitiateQueueConsultResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateQueueConsult");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateQueueConsultResponse {
    return new CCaaS_InitiateQueueConsultResponse();
  }
}
