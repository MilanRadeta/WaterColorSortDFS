import { Cache } from "./Cache";
import { State } from "./State";

export class Node {
    static readonly cache = new Cache();
    parent?: Node;
    state: State;
    from: number;
    to: number;

    constructor(state: string, parent?: Node, from?: number, to?: number) {
        this.state = new State(state);
        this.parent = parent;
        this.from = from ?? -1;
        this.to = to ?? -1;

        Node.cache.save(this.state);
    }

    print(): void {
        let nodes: Node[] = [this];

        while(nodes[nodes.length - 1].parent) {
            nodes.push(nodes[nodes.length - 1].parent as Node);
        }

        nodes.pop();
        nodes = nodes.reverse();

        console.log(`Moves: ${nodes.length}`);
        console.log(nodes.map(n => `${n.from + 1} -> ${n.to + 1}`).join(', '));
    }

    isSolution(): boolean {
        return this.state.isSolution();
    }

    generateChildren(): Node[] {
        const nodes: Node[] = [];
        const { vials } = this.state;
        for (let i = 0; i < vials.length; i++) {
            for (let j = 0; j < vials.length; j++) {
                if (i !== j) {
                    const state = this.state.pour(i, j);
                    if (state && !Node.cache.has(state)) {
                        const node = new Node(state.toString(), this, i, j);
                        nodes.push(node);
                    }
                }
            }
        }

        return nodes;
    }
}