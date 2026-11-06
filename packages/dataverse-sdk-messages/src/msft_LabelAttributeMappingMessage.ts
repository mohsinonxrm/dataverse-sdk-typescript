import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msft_LabelAttributeMapping message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msft_LabelAttributeMappingRequestParameters {
  EntityId: string;
}

/**
 * msft_LabelAttributeMapping request message
 *
 * Web API Action: msft_LabelAttributeMapping
 */
export class msft_LabelAttributeMappingRequest
  extends OrganizationRequest
  implements Executable<msft_LabelAttributeMappingResponse>
{
  declare readonly Parameters: Readonly<msft_LabelAttributeMappingRequestParameters>;

  constructor(parameters: msft_LabelAttributeMappingRequestParameters) {
    super("msft_LabelAttributeMapping", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_LabelAttributeMapping`;

    const body = requestBody({
      EntityId: this.Parameters.EntityId,
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

  async parseResponse(response: Response): Promise<msft_LabelAttributeMappingResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return msft_LabelAttributeMappingResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msft_LabelAttributeMappingResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msft_LabelAttributeMapping action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msft_LabelAttributeMappingResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msft_LabelAttributeMapping response message
 *
 * `result` is the value the msft_LabelAttributeMapping action returns (see {@link msft_LabelAttributeMappingResult}).
 */
export class msft_LabelAttributeMappingResponse extends OrganizationResponse {
  constructor(public result: msft_LabelAttributeMappingResult) {
    super("msft_LabelAttributeMapping");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msft_LabelAttributeMappingResponse {
    return new msft_LabelAttributeMappingResponse(
      data === undefined ? [] : (data as { value: msft_LabelAttributeMappingResult }).value
    );
  }
}
