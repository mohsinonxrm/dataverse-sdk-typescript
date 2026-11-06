import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { CreateInstanceResponse as CreateInstanceResponseData } from "./types/index.js";

/**
 * Parameters of the CreateInstance message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateInstanceRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  Count: number;
}

/**
 * CreateInstance request message
 *
 * Web API Action: CreateInstance
 */
export class CreateInstanceRequest
  extends OrganizationRequest
  implements Executable<CreateInstanceResponse>
{
  declare readonly Parameters: Readonly<CreateInstanceRequestParameters>;

  constructor(parameters: CreateInstanceRequestParameters) {
    super("CreateInstance", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateInstance`;

    const body = requestBody({
      Target: this.Parameters.Target,
      Count: this.Parameters.Count,
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

  async parseResponse(response: Response): Promise<CreateInstanceResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CreateInstanceResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * CreateInstance response message
 */
export class CreateInstanceResponse extends OrganizationResponse {
  constructor(public result: CreateInstanceResponseData) {
    super("CreateInstance");
  }

  static fromResponse(data: unknown): CreateInstanceResponse {
    return new CreateInstanceResponse(responseObject<CreateInstanceResponseData>(data));
  }
}
