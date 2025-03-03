import { calculateDistance } from './Api/calculateDistance.js';
// const { calculateDistance } = require('./Api/calculateDistance.js');

import { notifyOnUploadChange } from './Api/Notification.js'; // Removed the extra parameter
// const { notifyOnUploadChange } = require('./Api/Notification.js');

// eslint-disable-next-line no-undef
// exports.calculateDistance = calculateDistance;
// // eslint-disable-next-line no-undef
// exports.notifyOnUploadChange = notifyOnUploadChange;

export { calculateDistance, notifyOnUploadChange };