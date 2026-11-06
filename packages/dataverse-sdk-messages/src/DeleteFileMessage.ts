import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DeleteFile message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteFileRequestParameters {
  FileId: string;
}

/**
 * DeleteFile request message
 *
 * Web API Action: DeleteFile
 */
export class DeleteFileRequest
  extends OrganizationRequest
  implements Executable<DeleteFileResponse>
{
  declare readonly Parameters: Readonly<DeleteFileRequestParameters>;

  constructor(parameters: DeleteFileRequestParameters) {
    super("DeleteFile", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteFile`;

    const body = requestBody({
      FileId: this.Parameters.FileId,
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

  async parseResponse(response: Response): Promise<DeleteFileResponse> {
    // No return value (204 No Content)
    return new DeleteFileResponse();
  }
}

/**
 * DeleteFile response message
 */
export class DeleteFileResponse extends OrganizationResponse {
  constructor() {
    super("DeleteFile");
  }

  static fromResponse(_data: unknown): DeleteFileResponse {
    return new DeleteFileResponse();
  }
}
