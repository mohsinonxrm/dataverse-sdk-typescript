import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_GetDuplicatesAction request message
 *
 * Web API Action: msdyn_GetDuplicatesAction
 */
export class msdyn_GetDuplicatesActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetDuplicatesActionResponse>
{
  constructor(public record: EntityReference) {
    super("msdyn_GetDuplicatesAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDuplicatesAction`;

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

  async parseResponse(response: Response): Promise<msdyn_GetDuplicatesActionResponse> {
    const data = await response.json();
    return msdyn_GetDuplicatesActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Record: this.record,
    };
  }
}

/**
 * msdyn_GetDuplicatesAction response message
 */
export class msdyn_GetDuplicatesActionResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("msdyn_GetDuplicatesAction");
  }

  static fromResponse(data: unknown): msdyn_GetDuplicatesActionResponse {
    return new msdyn_GetDuplicatesActionResponse((data as any).value);
  }
}
