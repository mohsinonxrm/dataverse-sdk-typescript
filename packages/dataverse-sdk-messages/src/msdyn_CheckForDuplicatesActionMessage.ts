import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CheckForDuplicatesActionResponse as msdyn_CheckForDuplicatesActionResponseData } from "./types/index.js";

/**
 * msdyn_CheckForDuplicatesAction request message
 *
 * Web API Action: msdyn_CheckForDuplicatesAction
 */
export class msdyn_CheckForDuplicatesActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForDuplicatesActionResponse>
{
  constructor(public record?: EntityReference | AnyEntityPayload) {
    super("msdyn_CheckForDuplicatesAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDuplicatesAction`;

    const body: Record<string, unknown> = {
      Record: this.record,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForDuplicatesActionResponse> {
    const data = await response.json();
    return msdyn_CheckForDuplicatesActionResponse.fromResponse(data);
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
