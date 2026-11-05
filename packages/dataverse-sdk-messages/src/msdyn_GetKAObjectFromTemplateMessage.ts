import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_GetKAObjectFromTemplate request message
 *
 * Web API Action: msdyn_GetKAObjectFromTemplate
 */
export class msdyn_GetKAObjectFromTemplateRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKAObjectFromTemplateResponse>
{
  constructor(public templateId: string) {
    super("msdyn_GetKAObjectFromTemplate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKAObjectFromTemplate`;

    const body: Record<string, unknown> = {
      TemplateId: this.templateId,
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

  async parseResponse(response: Response): Promise<msdyn_GetKAObjectFromTemplateResponse> {
    const data = await response.json();
    return msdyn_GetKAObjectFromTemplateResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      TemplateId: this.templateId,
    };
  }
}

/**
 * msdyn_GetKAObjectFromTemplate response message
 */
export class msdyn_GetKAObjectFromTemplateResponse extends OrganizationResponse {
  constructor(public result: EntityReference) {
    super("msdyn_GetKAObjectFromTemplate");
  }

  static fromResponse(data: unknown): msdyn_GetKAObjectFromTemplateResponse {
    return new msdyn_GetKAObjectFromTemplateResponse((data as any).value);
  }
}
