import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_MergeDuplicatesAction request message
 *
 * Web API Action: msdyn_MergeDuplicatesAction
 */
export class msdyn_MergeDuplicatesActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_MergeDuplicatesActionResponse>
{
  constructor(
    public target: EntityReference,
    public duplicates: Record<string, unknown>[],
    public performParentingChecks: boolean
  ) {
    super("msdyn_MergeDuplicatesAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MergeDuplicatesAction`;

    const body: Record<string, unknown> = {
      Target: this.target,
      Duplicates: this.duplicates,
      PerformParentingChecks: this.performParentingChecks,
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

  async parseResponse(response: Response): Promise<msdyn_MergeDuplicatesActionResponse> {
    // No return value (204 No Content)
    return new msdyn_MergeDuplicatesActionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      Duplicates: this.duplicates,
      PerformParentingChecks: this.performParentingChecks,
    };
  }
}

/**
 * msdyn_MergeDuplicatesAction response message
 */
export class msdyn_MergeDuplicatesActionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_MergeDuplicatesAction");
  }

  static fromResponse(_data: unknown): msdyn_MergeDuplicatesActionResponse {
    return new msdyn_MergeDuplicatesActionResponse();
  }
}
