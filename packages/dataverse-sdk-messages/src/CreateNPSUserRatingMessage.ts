import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CreateNPSUserRating request message
 *
 * Web API Action: CreateNPSUserRating
 */
export class CreateNPSUserRatingRequest
  extends OrganizationRequest
  implements Executable<CreateNPSUserRatingResponse>
{
  constructor(
    public score: number,
    public comment: string,
    public appModuleId: string,
    public browser: string,
    public device: string
  ) {
    super("CreateNPSUserRating");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateNPSUserRating`;

    const body: Record<string, unknown> = {
      Score: this.score,
      Comment: this.comment,
      AppModuleId: this.appModuleId,
      Browser: this.browser,
      Device: this.device,
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

  async parseResponse(response: Response): Promise<CreateNPSUserRatingResponse> {
    // No return value (204 No Content)
    return new CreateNPSUserRatingResponse();
  }
}

/**
 * CreateNPSUserRating response message
 */
export class CreateNPSUserRatingResponse extends OrganizationResponse {
  constructor() {
    super("CreateNPSUserRating");
  }

  static fromResponse(_data: unknown): CreateNPSUserRatingResponse {
    return new CreateNPSUserRatingResponse();
  }
}
