import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CreateNPSUserRating message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateNPSUserRatingRequestParameters {
  Score: number;
  Comment?: string;
  AppModuleId: string;
  Browser: string;
  Device: string;
}

/**
 * CreateNPSUserRating request message
 *
 * Web API Action: CreateNPSUserRating
 */
export class CreateNPSUserRatingRequest
  extends OrganizationRequest
  implements Executable<CreateNPSUserRatingResponse>
{
  declare readonly Parameters: Readonly<CreateNPSUserRatingRequestParameters>;

  constructor(parameters: CreateNPSUserRatingRequestParameters) {
    super("CreateNPSUserRating", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateNPSUserRating`;

    const body = requestBody({
      Score: this.Parameters.Score,
      Comment: this.Parameters.Comment,
      AppModuleId: this.Parameters.AppModuleId,
      Browser: this.Parameters.Browser,
      Device: this.Parameters.Device,
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
