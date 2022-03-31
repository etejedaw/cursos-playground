type functionNumber = (num: number) => number[];

function range(start: number, end?: number): number[] | functionNumber {
    if(end || end === 0){
        const array: number[] = []
        for(let i = start; i <= end; i++ ) array.push(i);
        return array;
    }
    return function(endNumber: number): number[]{
        return range(start, endNumber) as number[];
    };
}

console.log(range(3,3));
console.log(range(3,8));
console.log(range(3,0));

const start3 = range(3) as functionNumber;
const start4 = range(4) as functionNumber;

console.log(start3(3));
console.log(start3(8));
console.log(start3(0));
console.log(start4(6));