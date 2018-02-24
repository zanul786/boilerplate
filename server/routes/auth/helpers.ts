import * as moment from 'moment';

export const getJwtPayload = (user) => {
  return {
    valid: true,
    fullName: user.fullName,
    firstName: user.name.first,
    id: user._id.toString(),
    expires: moment.utc().add(1, 'day').format('YYYY-MM-DD HH:mm')
  };
};
