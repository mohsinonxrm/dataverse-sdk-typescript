import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { SubstituteForComponentResponse as SubstituteForComponentResponseData } from "./types/index.js";

/**
 * Parameters of the SubstituteForComponent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SubstituteForComponentRequestParameters {
  Entity: EntityReference | AnyEntityPayload;
  SubStore: string;
}

/**
 * SubstituteForComponent request message
 *
 * Web API Action: SubstituteForComponent
 */
export class SubstituteForComponentRequest
  extends OrganizationRequest
  implements Executable<SubstituteForComponentResponse>
{
  declare readonly Parameters: Readonly<SubstituteForComponentRequestParameters>;

  constructor(parameters: SubstituteForComponentRequestParameters) {
    super("SubstituteForComponent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SubstituteForComponent`;

    const body = requestBody({
      Entity: this.Parameters.Entity,
      SubStore: this.Parameters.SubStore,
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

  async parseResponse(response: Response): Promise<SubstituteForComponentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return SubstituteForComponentResponse.fromResponse({});
    return SubstituteForComponentResponse.fromResponse(await response.json());
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
