import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ValidateSavedQuery request message
 *
 * Web API Action: ValidateSavedQuery
 */
export class ValidateSavedQueryRequest
  extends OrganizationRequest
  implements Executable<ValidateSavedQueryResponse>
{
  constructor(
    public fetchXml: string,
    public queryType: number
  ) {
    super("ValidateSavedQuery");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateSavedQuery`;

    const body: Record<string, unknown> = {
      FetchXml: this.fetchXml,
      QueryType: this.queryType,
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

  async parseResponse(response: Response): Promise<ValidateSavedQueryResponse> {
    // No return value (204 No Content)
    return new ValidateSavedQueryResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      FetchXml: this.fetchXml,
      QueryType: this.queryType,
    };
  }
}

/**
 * ValidateSavedQuery response message
 */
export class ValidateSavedQueryResponse extends OrganizationResponse {
  constructor() {
    super("ValidateSavedQuery");
  }

  static fromResponse(_data: unknown): ValidateSavedQueryResponse {
    return new ValidateSavedQueryResponse();
  }
}
