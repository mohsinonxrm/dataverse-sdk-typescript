import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { RollbackRetainResponse as RollbackRetainResponseData } from "./types/index.js";

/**
 * Parameters of the RollbackRetain message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RollbackRetainRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  OperationId?: string;
}

/**
 * RollbackRetain request message
 *
 * Web API Action: RollbackRetain
 */
export class RollbackRetainRequest
  extends OrganizationRequest
  implements Executable<RollbackRetainResponse>
{
  declare readonly Parameters: Readonly<RollbackRetainRequestParameters>;

  constructor(parameters: RollbackRetainRequestParameters) {
    super("RollbackRetain", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RollbackRetain`;

    const body = requestBody({
      Target: this.Parameters.Target,
      OperationId: this.Parameters.OperationId,
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

  async parseResponse(response: Response): Promise<RollbackRetainResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return RollbackRetainResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * RollbackRetain response message
 */
export class RollbackRetainResponse extends OrganizationResponse {
  constructor(public result: RollbackRetainResponseData) {
    super("RollbackRetain");
  }

  static fromResponse(data: unknown): RollbackRetainResponse {
    return new RollbackRetainResponse(responseObject<RollbackRetainResponseData>(data));
  }
}
