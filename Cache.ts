import { State } from "./State";

export class Cache {
    cache = new Set<string>();

    save(state: State): void {
        this.cache.add(this.normalize(state));
    }

    has(state: State): boolean {
        return this.cache.has(this.normalize(state));
    }

    normalize(state: State): string {
        return state.toString().split(' ').sort().join(' ');
    }
}