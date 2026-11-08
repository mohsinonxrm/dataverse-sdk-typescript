import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveDataEncryptionKey request message
 *
 * Web API Function: RetrieveDataEncryptionKey
 */
export class RetrieveDataEncryptionKeyRequest
  extends OrganizationRequest
  implements Executable<RetrieveDataEncryptionKeyResponse>
{
  constructor() {
    super("RetrieveDataEncryptionKey");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDataEncryptionKey`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveDataEncryptionKeyResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveDataEncryptionKeyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveDataEncryptionKey function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveDataEncryptionKeyResult {
  "@odata.context"?: string;
  EncryptionKey: string;
}

/**
 * RetrieveDataEncryptionKey response message
 *
 * `result` is the value the RetrieveDataEncryptionKey function returns (see {@link RetrieveDataEncryptionKeyResult}).
 */
export class RetrieveDataEncryptionKeyResponse extends OrganizationResponse {
  constructor(public result: RetrieveDataEncryptionKeyResult) {
    super("RetrieveDataEncryptionKey");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveDataEncryptionKeyResponse {
    return new RetrieveDataEncryptionKeyResponse(data as RetrieveDataEncryptionKeyResult);
  }
}
