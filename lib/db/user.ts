import * as mongoose from 'mongoose';

export const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [String],
  stripeCustomerId: {
    type: String,
    required: true
  },
  defaultCardToken: {
    type: String,
    required: true
  },
  cardTokens: [String],
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  }
}, { timestamps: true });


UserSchema.pre('save', function(next) {
  const email = this.get('profile.email');
  if (email) {
    this.profile.email = this.profile.email.toLowerCase();
  }

  const firstName = this.firstName;
  if (firstName) {
    this.set('profile.name.first', firstName.trim());
  }

  const lastName = this.get('profile.name.last');
  if (lastName) {
    this.set('profile.name.last', lastName.trim());
  }

  next();
});

UserSchema.virtual('fullName').get(function() {
  return `${this.name.first} ${this.name.last}`;
});

UserSchema.virtual('isAdmin').get(function() {
  return this.roles.includes('Admin');
});
