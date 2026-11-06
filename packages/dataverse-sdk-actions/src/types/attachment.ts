/**
 * attachment entity type
 */
export interface attachment {
  attachmentid?: string;
  body?: string;
  body_binary?: string;
  filename?: string;
  filesize?: number;
  mimetype?: string;
  prefix?: string;
  subject?: string;
  versionnumber?: number;
}
