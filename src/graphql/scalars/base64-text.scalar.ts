import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode, GraphQLError } from 'graphql';
import { isNil, isString } from 'lodash';
import { decodeBase64Text, encodeTextBase64 } from '@common/utils/base64.util';
import { CUSTOM_HTTP_STATUS } from '@common/constants/http-status.constant';

/**
 * Base64Text Scalar
 *
 * Automatically decodes Base64 strings to text in GraphQL.
 * Only decodes when the result is safe printable text (not binary data like images).
 *
 * @example
 * ```typescript
 * @Field(() => Base64TextScalar, { nullable: true })
 * data: string;
 * ```
 */
@Scalar('Base64Text')
export class Base64TextScalar implements CustomScalar<Nullable<string>, Nullable<string>> {
  description = 'Base64Text custom scalar type - decodes Base64 strings to text';

  parseValue(value: Nullable<string>): Nullable<string> {
    if (isNil(value)) {
      return value;
    }
    if (!isString(value)) {
      this.throwError('must be a string');
    }
    try {
      return decodeBase64Text(value);
    } catch (error) {
      this.throwError((error as Error)?.message);
    }
  }

  serialize(value: Nullable<string>): Nullable<string> {
    if (isNil(value)) {
      return value;
    }
    if (!isString(value)) {
      this.throwError('must be a string');
    }
    try {
      return encodeTextBase64(value);
    } catch (error) {
      this.throwError((error as Error)?.message);
    }
  }

  parseLiteral(ast: ValueNode): Nullable<string> {
    if (ast.kind !== Kind.STRING) {
      this.throwError('must be a string');
    }
    try {
      return decodeBase64Text(ast.value);
    } catch (error) {
      this.throwError((error as Error)?.message);
    }
  }

  private throwError(message: string): never {
    throw new GraphQLError(message, {
      extensions: {
        ...CUSTOM_HTTP_STATUS.VALIDATION_FAILED,
        message,
      },
    });
  }
}
