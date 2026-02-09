import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_CheckForDuplicatesAction request message
 *
 * Web API Action: msdyn_CheckForDuplicatesAction
 */
export class msdyn_CheckForDuplicatesActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForDuplicatesActionResponse>
{
  constructor(public record: EntityReference) {
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForDuplicatesActionResponse> {
    const data = await response.json();
    return msdyn_CheckForDuplicatesActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Record: this.record,
    };
  }
}

/**
 * msdyn_CheckForDuplicatesAction response message
 */
export class msdyn_CheckForDuplicatesActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForDuplicatesActionResponse) {
    super("msdyn_CheckForDuplicatesAction");
  }

  static fromResponse(data: unknown): msdyn_CheckForDuplicatesActionResponse {
    return new msdyn_CheckForDuplicatesActionResponse((data as any).value);
  }
}
