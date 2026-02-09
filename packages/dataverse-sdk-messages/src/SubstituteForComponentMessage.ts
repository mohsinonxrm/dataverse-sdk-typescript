import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * SubstituteForComponent request message
 *
 * Web API Action: SubstituteForComponent
 */
export class SubstituteForComponentRequest
  extends OrganizationRequest
  implements Executable<SubstituteForComponentResponse>
{
  constructor(
    public entity: EntityReference,
    public subStore: string
  ) {
    super("SubstituteForComponent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SubstituteForComponent`;

    const body: Record<string, unknown> = {
      Entity: this.entity,
      SubStore: this.subStore,
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

  async parseResponse(response: Response): Promise<SubstituteForComponentResponse> {
    const data = await response.json();
    return SubstituteForComponentResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Entity: this.entity,
      SubStore: this.subStore,
    };
  }
}

/**
 * SubstituteForComponent response message
 */
export class SubstituteForComponentResponse extends OrganizationResponse {
  constructor(public result: SubstituteForComponentResponse) {
    super("SubstituteForComponent");
  }

  static fromResponse(data: unknown): SubstituteForComponentResponse {
    return new SubstituteForComponentResponse((data as any).value);
  }
}
