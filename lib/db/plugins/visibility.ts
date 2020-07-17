export const visibilityPlugin = (schema) => {
  schema.path('isDeleted', { type: Boolean, default: false });
  schema.path('isPublished', { type: Boolean, default: true });

  schema
    .pre('count', addFiltersIfNotPresent)
    .pre('find', addFiltersIfNotPresent)
    .pre('findOne', addFiltersIfNotPresent)
    .pre('update', addFiltersIfNotPresent)
    .pre('findOneAndUpdate', addFiltersIfNotPresent);
};

function addFiltersIfNotPresent(next) {
  if (this.options && this.options.getDeleted) {
    next();
    return;
  }

  if (this.options && this.options.skipVisibility) {
    this._conditions.isDeleted = false;
    next();
    return;
  }

  if (typeof this._conditions.isPublished === 'undefined') {
    this._conditions.isPublished = true;
  }

  if (typeof this._conditions.isDeleted === 'undefined') {
    this._conditions.isDeleted = false;
  }

  next();
}

