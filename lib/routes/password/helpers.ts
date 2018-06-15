import * as moment from 'moment';

export const getJwtPayload = (user) => {
  return {
    valid: true,
    id: user._id.toString(),
    expires: moment.utc().add(1, 'day').format('YYYY-MM-DD HH:mm')
  };
};
