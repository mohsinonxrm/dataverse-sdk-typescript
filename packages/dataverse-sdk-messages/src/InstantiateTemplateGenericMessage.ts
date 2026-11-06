import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the InstantiateTemplateGeneric message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InstantiateTemplateGenericRequestParameters {
  TemplateId: string;
  ObjectType: string;
  ObjectId: string;
  EntityLogicalName?: string;
}

/**
 * InstantiateTemplateGeneric request message
 *
 * Web API Action: InstantiateTemplateGeneric
 */
export class InstantiateTemplateGenericRequest
  extends OrganizationRequest
  implements Executable<InstantiateTemplateGenericResponse>
{
  declare readonly Parameters: Readonly<InstantiateTemplateGenericRequestParameters>;

  constructor(parameters: InstantiateTemplateGenericRequestParameters) {
    super("InstantiateTemplateGeneric", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstantiateTemplateGeneric`;

    const body = requestBody({
      TemplateId: this.Parameters.TemplateId,
      ObjectType: this.Parameters.ObjectType,
      ObjectId: this.Parameters.ObjectId,
      EntityLogicalName: this.Parameters.EntityLogicalName,
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

  async parseResponse(response: Response): Promise<InstantiateTemplateGenericResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return InstantiateTemplateGenericResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * InstantiateTemplateGeneric response message
 */
export class InstantiateTemplateGenericResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("InstantiateTemplateGeneric");
  }

  static fromResponse(data: unknown): InstantiateTemplateGenericResponse {
    return new InstantiateTemplateGenericResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
