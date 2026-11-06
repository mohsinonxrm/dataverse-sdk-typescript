import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_cloneentity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_cloneentityRequestParameters {
  SourceEntity: EntityReference | AnyEntityPayload;
  QueryReference?: EntityReference | AnyEntityPayload;
  TransformAction?: string;
  TransformParams?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_cloneentity request message
 *
 * Web API Action: msdyn_cloneentity
 */
export class msdyn_cloneentityRequest
  extends OrganizationRequest
  implements Executable<msdyn_cloneentityResponse>
{
  declare readonly Parameters: Readonly<msdyn_cloneentityRequestParameters>;

  constructor(parameters: msdyn_cloneentityRequestParameters) {
    super("msdyn_cloneentity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_cloneentity`;

    const body = requestBody({
      SourceEntity: this.Parameters.SourceEntity,
      QueryReference: this.Parameters.QueryReference,
      TransformAction: this.Parameters.TransformAction,
      TransformParams: this.Parameters.TransformParams,
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

  async parseResponse(response: Response): Promise<msdyn_cloneentityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_cloneentityResponse.fromResponse({});
    return msdyn_cloneentityResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_cloneentity response message
 */
export class msdyn_cloneentityResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("msdyn_cloneentity");
  }

  static fromResponse(data: unknown): msdyn_cloneentityResponse {
    return new msdyn_cloneentityResponse(responseObject<Record<string, unknown>>(data));
  }
}
