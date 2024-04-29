import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

// This decorator is used to document the authentication header
export function ApiXBUIDHeader() {
  return applyDecorators(
    ApiHeader({
      name: 'X-UBID',
      description:
        "Every request from a birdhouse has this header for authentication. It's a UUID. Example: X-UBID: 69e03f88-2a05-4d8d-a540-073f8910aec5",
      example: '69e03f88-2a05-4d8d-a540-073f8910aec5',
      required: true,
    }),
  );
}
