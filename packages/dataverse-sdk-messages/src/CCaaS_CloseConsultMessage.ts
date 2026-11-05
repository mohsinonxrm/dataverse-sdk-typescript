import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_CloseConsult request message
 *
 * Web API Action: CCaaS_CloseConsult
 */
export class CCaaS_CloseConsultRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CloseConsultResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string
  ) {
    super("CCaaS_CloseConsult");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_CloseConsult`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_CloseConsultResponse> {
    // No return value (204 No Content)
    return new CCaaS_CloseConsultResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      ApiVersion: this.apiVersion,
    };
  }
}

/**
 * CCaaS_CloseConsult response message
 */
export class CCaaS_CloseConsultResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_CloseConsult");
  }

  static fromResponse(_data: unknown): CCaaS_CloseConsultResponse {
    return new CCaaS_CloseConsultResponse();
  }
}
