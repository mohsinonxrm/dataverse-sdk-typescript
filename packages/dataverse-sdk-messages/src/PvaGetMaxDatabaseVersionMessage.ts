import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { PvaGetMaxDatabaseVersionResponse as PvaGetMaxDatabaseVersionResponseData } from "./types/index.js";

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
    const data = await response.json();
    return PvaGetMaxDatabaseVersionResponse.fromResponse(data);
  }
}

/**
 * PvaGetMaxDatabaseVersion response message
 */
export class PvaGetMaxDatabaseVersionResponse extends OrganizationResponse {
  constructor(public result: PvaGetMaxDatabaseVersionResponseData) {
    super("PvaGetMaxDatabaseVersion");
  }

  static fromResponse(data: unknown): PvaGetMaxDatabaseVersionResponse {
    return new PvaGetMaxDatabaseVersionResponse(
      responseObject<PvaGetMaxDatabaseVersionResponseData>(data)
    );
  }
}
