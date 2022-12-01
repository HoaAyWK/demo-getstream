import { format, formatDistanceToNow } from 'date-fns';

export function fToNow(date) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
    });
};
