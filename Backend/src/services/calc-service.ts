class CalcService {

    public getSum(arr: number[]): number {
        if(!arr || arr.length === 0) {
            throw new Error("Array can't be empty.");
        }
        let sum = 0;
        for(const item of arr) {
            sum += item;
        }
        return sum;
    }

}

export const calcService = new CalcService();
