import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ExecuteARCResponse as msdyn_ExecuteARCResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ExecuteARC message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteARCRequestParameters {
  CreatedEntityReference: EntityReference | AnyEntityPayload;
  RuleId?: string;
}

/**
 * msdyn_ExecuteARC request message
 *
 * Web API Action: msdyn_ExecuteARC
 */
export class msdyn_ExecuteARCRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteARCResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteARCRequestParameters>;

  constructor(parameters: msdyn_ExecuteARCRequestParameters) {
    super("msdyn_ExecuteARC", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteARC`;

    const body = requestBody({
      CreatedEntityReference: this.Parameters.CreatedEntityReference,
      RuleId: this.Parameters.RuleId,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteARCResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ExecuteARCResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_ExecuteARC response message
 */
export class msdyn_ExecuteARCResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteARCResponseData) {
    super("msdyn_ExecuteARC");
  }

  static fromResponse(data: unknown): msdyn_ExecuteARCResponse {
    return new msdyn_ExecuteARCResponse(responseObject<msdyn_ExecuteARCResponseData>(data));
  }
}
