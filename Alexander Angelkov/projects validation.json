{
  $jsonSchema: {
    bsonType: 'object',
    required: [
      'username',
      'firstName',
      'lastName',
      'password',
      'email',
      '_id',
      '__v'
    ],
    properties: {
      _id: {
        bsonType: 'objectId'
      },
      __v: {
        bsonType: 'int'
      },
      username: {
        bsonType: 'string',
        maxLength: 50,
        description: 'username must be a string, is required, has max length of 50 characters'
      },
      firstName: {
        bsonType: 'string',
        maxLength: 50,
        description: 'firstName must be a string, is required, has max length of 50 characters'
      },
      lastName: {
        bsonType: 'string',
        maxLength: 50,
        description: 'lastName must be an string, is required, has max length of 50 characters'
      },
      email: {
        bsonType: 'string',
        pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
        description: 'email must be a string, is required, must follow the email regex format'
      },
      password: {
        bsonType: 'string',
        minLength: 8,
        description: 'password must be a string, is required, must be at least 8 characters long'
      },
      resetPasswordToken: {
        bsonType: 'string',
        description: 'resetPasswordToken must be a string'
      },
      resetPasswordExpires: {
        bsonType: 'date',
        description: 'resetPasswordExpires must be a date'
      }
    },
    additionalProperties: false,
    dependencies: {
      resetPasswordExpires: [
        'resetPasswordToken'
      ],
      resetPasswordToken: [
        'resetPasswordExpires'
      ]
    }
  }
}
