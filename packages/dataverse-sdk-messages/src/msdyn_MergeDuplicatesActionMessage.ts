import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_MergeDuplicatesAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MergeDuplicatesActionRequestParameters {
  Target?: EntityReference | AnyEntityPayload;
  Duplicates?: Record<string, unknown>[];
  PerformParentingChecks?: boolean;
}

/**
 * msdyn_MergeDuplicatesAction request message
 *
 * Web API Action: msdyn_MergeDuplicatesAction
 */
export class msdyn_MergeDuplicatesActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_MergeDuplicatesActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_MergeDuplicatesActionRequestParameters>;

  constructor(parameters: msdyn_MergeDuplicatesActionRequestParameters = {}) {
    super("msdyn_MergeDuplicatesAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MergeDuplicatesAction`;

    const body = requestBody({
      Target: this.Parameters.Target,
      Duplicates: this.Parameters.Duplicates,
      PerformParentingChecks: this.Parameters.PerformParentingChecks,
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

  async parseResponse(response: Response): Promise<msdyn_MergeDuplicatesActionResponse> {
    // No return value (204 No Content)
    return new msdyn_MergeDuplicatesActionResponse();
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
