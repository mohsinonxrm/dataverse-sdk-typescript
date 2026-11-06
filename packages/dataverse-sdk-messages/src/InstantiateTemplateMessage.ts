import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the InstantiateTemplate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InstantiateTemplateRequestParameters {
  TemplateId: string;
  ObjectType: string;
  ObjectId: string;
}

/**
 * InstantiateTemplate request message
 *
 * Web API Action: InstantiateTemplate
 */
export class InstantiateTemplateRequest
  extends OrganizationRequest
  implements Executable<InstantiateTemplateResponse>
{
  declare readonly Parameters: Readonly<InstantiateTemplateRequestParameters>;

  constructor(parameters: InstantiateTemplateRequestParameters) {
    super("InstantiateTemplate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstantiateTemplate`;

    const body = requestBody({
      TemplateId: this.Parameters.TemplateId,
      ObjectType: this.Parameters.ObjectType,
      ObjectId: this.Parameters.ObjectId,
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

  async parseResponse(response: Response): Promise<InstantiateTemplateResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return InstantiateTemplateResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * InstantiateTemplate response message
 */
export class InstantiateTemplateResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("InstantiateTemplate");
  }

  static fromResponse(data: unknown): InstantiateTemplateResponse {
    return new InstantiateTemplateResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
