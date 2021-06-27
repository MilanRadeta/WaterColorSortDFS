
import { Node } from "./Node";

// const state = '0011 1100 ';
const state = '0012 3456 7869 9859 2a81 171a b867 b56b 2034 43a7 2ba3 9504  ';
const root = new Node(state);
const nodes: Node[] = [root];

while(nodes.length) {
    const node = nodes.pop();
    if (node) {
        if (node.isSolution()) {
            node.print();
            break;
        }

        nodes.push(...node.generateChildren());

        if (!nodes.length) {
            console.log(`No solution`);
        }
    }
}