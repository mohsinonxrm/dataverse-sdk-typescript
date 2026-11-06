import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_transformentity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_transformentityRequestParameters {
  Entity: EntityReference | AnyEntityPayload;
  Params: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_transformentity request message
 *
 * Web API Action: msdyn_transformentity
 */
export class msdyn_transformentityRequest
  extends OrganizationRequest
  implements Executable<msdyn_transformentityResponse>
{
  declare readonly Parameters: Readonly<msdyn_transformentityRequestParameters>;

  constructor(parameters: msdyn_transformentityRequestParameters) {
    super("msdyn_transformentity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_transformentity`;

    const body = requestBody({
      Entity: this.Parameters.Entity,
      Params: this.Parameters.Params,
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

  async parseResponse(response: Response): Promise<msdyn_transformentityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_transformentityResponse.fromResponse({});
    return msdyn_transformentityResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_transformentity response message
 */
export class msdyn_transformentityResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("msdyn_transformentity");
  }

  static fromResponse(data: unknown): msdyn_transformentityResponse {
    return new msdyn_transformentityResponse(responseObject<Record<string, unknown>>(data));
  }
}
