/**
 * attachment entity type
 */
export interface attachment {
  filesize?: number;
  mimetype?: string;
  filename?: string;
  prefix?: string;
  body?: string;
  body_binary?: string;
  attachmentid?: string;
  subject?: string;
  versionnumber?: number;
}
