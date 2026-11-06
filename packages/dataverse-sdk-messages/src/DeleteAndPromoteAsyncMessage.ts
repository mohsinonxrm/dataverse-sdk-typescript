import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { DeleteAndPromoteAsyncResponse as DeleteAndPromoteAsyncResponseData } from "./types/index.js";

/**
 * Parameters of the DeleteAndPromoteAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteAndPromoteAsyncRequestParameters {
  UniqueName: string;
}

/**
 * DeleteAndPromoteAsync request message
 *
 * Web API Action: DeleteAndPromoteAsync
 */
export class DeleteAndPromoteAsyncRequest
  extends OrganizationRequest
  implements Executable<DeleteAndPromoteAsyncResponse>
{
  declare readonly Parameters: Readonly<DeleteAndPromoteAsyncRequestParameters>;

  constructor(parameters: DeleteAndPromoteAsyncRequestParameters) {
    super("DeleteAndPromoteAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAndPromoteAsync`;

    const body = requestBody({
      UniqueName: this.Parameters.UniqueName,
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

  async parseResponse(response: Response): Promise<DeleteAndPromoteAsyncResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return DeleteAndPromoteAsyncResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * DeleteAndPromoteAsync response message
 */
export class DeleteAndPromoteAsyncResponse extends OrganizationResponse {
  constructor(public result: DeleteAndPromoteAsyncResponseData) {
    super("DeleteAndPromoteAsync");
  }

  static fromResponse(data: unknown): DeleteAndPromoteAsyncResponse {
    return new DeleteAndPromoteAsyncResponse(
      responseObject<DeleteAndPromoteAsyncResponseData>(data)
    );
  }
}
