import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaGetMaxDatabaseVersion request message
 *
 * Web API Action: PvaGetMaxDatabaseVersion
 */
export class PvaGetMaxDatabaseVersionRequest
  extends OrganizationRequest
  implements Executable<PvaGetMaxDatabaseVersionResponse>
{
  constructor() {
    super("PvaGetMaxDatabaseVersion");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PvaGetMaxDatabaseVersion`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaGetMaxDatabaseVersionResponse> {
    // The body is the complex value, with its @odata.context
    return PvaGetMaxDatabaseVersionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PvaGetMaxDatabaseVersion action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PvaGetMaxDatabaseVersionResult {
  "@odata.context"?: string;
  VersionInfo: string;
}

/**
 * PvaGetMaxDatabaseVersion response message
 *
 * `result` is the value the PvaGetMaxDatabaseVersion action returns (see {@link PvaGetMaxDatabaseVersionResult}).
 */
export class PvaGetMaxDatabaseVersionResponse extends OrganizationResponse {
  constructor(public result: PvaGetMaxDatabaseVersionResult) {
    super("PvaGetMaxDatabaseVersion");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PvaGetMaxDatabaseVersionResponse {
    return new PvaGetMaxDatabaseVersionResponse(data as PvaGetMaxDatabaseVersionResult);
  }
}
