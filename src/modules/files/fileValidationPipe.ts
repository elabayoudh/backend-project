import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  allowedMimeTypes = ['file/pdf'];

  transform(value: any, metadata: ArgumentMetadata) {
    // // "value" is an object containing the file's attributes and metadata
    // const sizeKb = 500 ;
    // const isValidSize = value.size < sizeKb;

    // Check if the MIME type is allowed
    const isValidMimeType = this.allowedMimeTypes.includes(value.mimetype);

    if (!isValidMimeType) {
      throw new BadRequestException('Invalid file type  Only PDF files are allowed.');
    }

    return value;
  }
}
