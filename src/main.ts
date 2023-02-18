import { Duration, DateTime } from 'luxon';

function assert(assertion: boolean, errorMessage: string): void {
    if (!assertion) {
        throw new Error(errorMessage);
    }
}

export const duration = {
    name: 'duration',
    coerce: (v: any): number => {
        const split = v.split(' ');
        if (split.length === 1) {
            // It must be an integer in string form
            v = parseInt(v, 10);
        } else {
            // Add an "s" as the unit of measurement used in Luxon
            if (!split[1].match(/s$/)) {
                split[1] += 's';
            }
            v = Duration.fromObject({ [split[1]]: parseInt(split[0], 10) }).valueOf();
        }
        return v;
    },
    validate: (x: any): void => {
        const errorMessage = 'must be a positive integer or human readable string (e.g. 3000, "5 days")';
        if (Number.isInteger(x)) {
            assert(x >= 0, errorMessage);
        } else {
            assert(x.match(/^(\d)+ (.+)$/), errorMessage);
        }
    }
};

export const timestamp = {
    name: 'timestamp',
    coerce: (v: any): number => {
        if (typeof v === 'number') {
            return v;
        } else {
            let value = DateTime.fromISO(v);
            if (!value.isValid) {
                value = DateTime.fromRFC2822(v);
            }
            return value.valueOf();
        }
    },
    validate: (x: any): void => {
        assert(Number.isInteger(x) && x >= 0, 'must be a positive integer, an ISO 8601 string, or an RFC 2822 string');
    }
};

export default { duration, timestamp };
