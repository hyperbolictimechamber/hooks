function setObjectByPath<T>(obj: T, path: string, value: unknown): void {
    const keys = path.split('.');
    let current: any = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
}

function getObjectByPath<T>(obj: T, path: string): unknown {
    const keys = path.split('.');
    let current: any = obj;

    for (let key of keys) {
        if (current == null || !(key in current)) {
            return undefined;
        }
        current = current[key];
    }

    return current;
}
