import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_CloneMultipleResponse as msdyn_CloneMultipleResponseData,
  msdyn_configuration,
} from "./types/index.js";

/**
 * Parameters of the msdyn_CloneMultiple message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CloneMultipleRequestParameters {
  EntityIds: string;
  QueryReference?: EntityReference | EntityPayload<msdyn_configuration>;
  UfxQuery?: string;
  TransformAction?: string;
  TransformParams?: string;
}

/**
 * msdyn_CloneMultiple request message
 *
 * Web API Action: msdyn_CloneMultiple
 */
export class msdyn_CloneMultipleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CloneMultipleResponse>
{
  declare readonly Parameters: Readonly<msdyn_CloneMultipleRequestParameters>;

  constructor(parameters: msdyn_CloneMultipleRequestParameters) {
    super("msdyn_CloneMultiple", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CloneMultiple`;

    const body = requestBody({
      EntityIds: this.Parameters.EntityIds,
      QueryReference: this.Parameters.QueryReference,
      UfxQuery: this.Parameters.UfxQuery,
      TransformAction: this.Parameters.TransformAction,
      TransformParams: this.Parameters.TransformParams,
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

  async parseResponse(response: Response): Promise<msdyn_CloneMultipleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CloneMultipleResponse.fromResponse(text ? JSON.parse(text) : {});
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
