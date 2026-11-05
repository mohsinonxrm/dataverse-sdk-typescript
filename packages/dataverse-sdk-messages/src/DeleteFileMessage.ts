import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DeleteFile request message
 *
 * Web API Action: DeleteFile
 */
export class DeleteFileRequest
  extends OrganizationRequest
  implements Executable<DeleteFileResponse>
{
  constructor(public fileId: string) {
    super("DeleteFile");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteFile`;

    const body: Record<string, unknown> = {
      FileId: this.fileId,
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
