

export class State {
    static readonly MAX_COLORS = 4;
    vials: string[] = [];

    constructor(states: string) {
        this.vials = states.split(' ');
    }

    toString(): string {
        return this.vials.join(' ');
    }

    pour(fromIndex: number, toIndex: number): State | null {
        const from = this.vials[fromIndex];
        const to = this.vials[toIndex];

        if (!from.length) {
            return null;
        }

        if (to.length && to[to.length - 1] != from[from.length - 1]) {
            return null;
        }

        const end = from.length;
        let start = end - 1;
        while (from[start] === from[start - 1]) {
            start--;
        }

        const count = end - start;

        if (to.length + count > State.MAX_COLORS) {
            return null;
        }

        const toColors = to + from.substring(start, end);
        const fromColors = from.substring(0, start);

        const vials = [...this.vials];
        vials[fromIndex] = fromColors;
        vials[toIndex] = toColors;
        
        return new State(vials.join(' '));
    }

    isSolution(): boolean {
        return this.vials.filter(v => v.length).every(v => v.length === State.MAX_COLORS && v.split('').every(c => c === v[0]))
    }
}