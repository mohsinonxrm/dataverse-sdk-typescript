import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { SubstituteForComponentResponse as SubstituteForComponentResponseData } from "./types/index.js";

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
    public entity: EntityReference | AnyEntityPayload,
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SubstituteForComponentResponse> {
    const data = await response.json();
    return SubstituteForComponentResponse.fromResponse(data);
  }
}

/**
 * SubstituteForComponent response message
 */
export class SubstituteForComponentResponse extends OrganizationResponse {
  constructor(public result: SubstituteForComponentResponseData) {
    super("SubstituteForComponent");
  }

  static fromResponse(data: unknown): SubstituteForComponentResponse {
    return new SubstituteForComponentResponse(
      responseObject<SubstituteForComponentResponseData>(data)
    );
  }
}
