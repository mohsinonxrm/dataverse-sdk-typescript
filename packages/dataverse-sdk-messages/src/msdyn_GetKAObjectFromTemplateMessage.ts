import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetKAObjectFromTemplate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKAObjectFromTemplateRequestParameters {
  TemplateId: string;
}

/**
 * msdyn_GetKAObjectFromTemplate request message
 *
 * Web API Action: msdyn_GetKAObjectFromTemplate
 */
export class msdyn_GetKAObjectFromTemplateRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKAObjectFromTemplateResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetKAObjectFromTemplateRequestParameters>;

  constructor(parameters: msdyn_GetKAObjectFromTemplateRequestParameters) {
    super("msdyn_GetKAObjectFromTemplate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKAObjectFromTemplate`;

    const body = requestBody({
      TemplateId: this.Parameters.TemplateId,
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

  async parseResponse(response: Response): Promise<msdyn_GetKAObjectFromTemplateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetKAObjectFromTemplateResponse.fromResponse({});
    return msdyn_GetKAObjectFromTemplateResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetKAObjectFromTemplate response message
 */
export class msdyn_GetKAObjectFromTemplateResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("msdyn_GetKAObjectFromTemplate");
  }

  static fromResponse(data: unknown): msdyn_GetKAObjectFromTemplateResponse {
    return new msdyn_GetKAObjectFromTemplateResponse(responseObject<Record<string, unknown>>(data));
  }
}
