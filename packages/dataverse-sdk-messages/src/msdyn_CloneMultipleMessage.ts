import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_CloneMultipleResponse as msdyn_CloneMultipleResponseData,
  msdyn_configuration,
} from "./types/index.js";

/**
 * msdyn_CloneMultiple request message
 *
 * Web API Action: msdyn_CloneMultiple
 */
export class msdyn_CloneMultipleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CloneMultipleResponse>
{
  constructor(
    public entityIds: string,
    public queryReference?: EntityReference | EntityPayload<msdyn_configuration>,
    public ufxQuery?: string,
    public transformAction?: string,
    public transformParams?: string
  ) {
    super("msdyn_CloneMultiple");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CloneMultiple`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
      QueryReference: this.queryReference,
      UfxQuery: this.ufxQuery,
      TransformAction: this.transformAction,
      TransformParams: this.transformParams,
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

  async parseResponse(response: Response): Promise<msdyn_CloneMultipleResponse> {
    const data = await response.json();
    return msdyn_CloneMultipleResponse.fromResponse(data);
  }
}

/**
 * msdyn_CloneMultiple response message
 */
export class msdyn_CloneMultipleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CloneMultipleResponseData) {
    super("msdyn_CloneMultiple");
  }

  static fromResponse(data: unknown): msdyn_CloneMultipleResponse {
    return new msdyn_CloneMultipleResponse(responseObject<msdyn_CloneMultipleResponseData>(data));
  }
}
