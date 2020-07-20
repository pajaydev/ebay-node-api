// Quick select.
// select kth greater element from array.
// select kth lesser element from array.
function QuickSelect(array, k){
    k = k-1;
    if(!array) return new Error('Input is invalid');
    const swap = (idx1, idx2) => {
        let temp = array[idx1];
        array[idx1] = array[idx2];
        array[idx2] = temp;
    };

    const partition = (start, end) => {
        let pivot = array[end];
        let index = start;
        for(let i=start; i<end; i++){
            if(array[i] > pivot){
                swap(i, index);
                index++;
            }
        }
        swap(end, index);
        return index;
    };
    // it should select the result.
    const select = (start, end) => {
        let pivot = partition(start, end);
        while(start <= end) {
            if(k === pivot) return array[pivot];
            else if(pivot > k) return select(start, pivot-1);
            else return select(pivot+1, end);
        }
        return array[start];
    };
    return select(0, array.length-1);
}

console.log(QuickSelect([7,5,8,1,2], 1));
