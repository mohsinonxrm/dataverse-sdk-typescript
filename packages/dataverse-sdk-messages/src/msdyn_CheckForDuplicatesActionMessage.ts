import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CheckForDuplicatesActionResponse as msdyn_CheckForDuplicatesActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForDuplicatesAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForDuplicatesActionRequestParameters {
  Record?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CheckForDuplicatesAction request message
 *
 * Web API Action: msdyn_CheckForDuplicatesAction
 */
export class msdyn_CheckForDuplicatesActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForDuplicatesActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForDuplicatesActionRequestParameters>;

  constructor(parameters: msdyn_CheckForDuplicatesActionRequestParameters = {}) {
    super("msdyn_CheckForDuplicatesAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDuplicatesAction`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForDuplicatesActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CheckForDuplicatesActionResponse.fromResponse({});
    return msdyn_CheckForDuplicatesActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckForDuplicatesAction response message
 */
export class msdyn_CheckForDuplicatesActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForDuplicatesActionResponseData) {
    super("msdyn_CheckForDuplicatesAction");
  }

  static fromResponse(data: unknown): msdyn_CheckForDuplicatesActionResponse {
    return new msdyn_CheckForDuplicatesActionResponse(
      responseObject<msdyn_CheckForDuplicatesActionResponseData>(data)
    );
  }
}
