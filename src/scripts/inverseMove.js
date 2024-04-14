export default function getInverseSolution(solution) {
    let inverseMove = ''

        if (move.includes("'")) {
            inverseMove = move.slice(0, -1);
        } else if (move.includes("2")) {
            inverseMove = move;
        } else {
            inverseMove = (move + "'");
        }
        
    return inverseMove;
}