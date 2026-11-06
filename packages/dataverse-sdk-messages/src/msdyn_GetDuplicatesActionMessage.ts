import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_GetDuplicatesAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetDuplicatesActionRequestParameters {
  Record?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetDuplicatesAction request message
 *
 * Web API Action: msdyn_GetDuplicatesAction
 */
export class msdyn_GetDuplicatesActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetDuplicatesActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetDuplicatesActionRequestParameters>;

  constructor(parameters: msdyn_GetDuplicatesActionRequestParameters = {}) {
    super("msdyn_GetDuplicatesAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDuplicatesAction`;

    const body = requestBody({
      Record: this.Parameters.Record,
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

  async parseResponse(response: Response): Promise<msdyn_GetDuplicatesActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetDuplicatesActionResponse.fromResponse({});
    return msdyn_GetDuplicatesActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetDuplicatesAction response message
 */
export class msdyn_GetDuplicatesActionResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_GetDuplicatesAction");
  }

  static fromResponse(data: unknown): msdyn_GetDuplicatesActionResponse {
    return new msdyn_GetDuplicatesActionResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
