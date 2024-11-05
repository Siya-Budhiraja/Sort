let array = [];

function generateArray() {
    array = Array.from({length: 50}, () => Math.floor(Math.random() * 400) + 10);
    drawArray();
}

function drawArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value}px`;
        bar.classList.add('bar');
        container.appendChild(bar);
    });
}

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(j, j + 1);
            }
        }
    }
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            await swap(j, j + 1);
            j--;
        }
        array[j + 1] = key;
        drawArray();
    }
}

async function mergeSort() {
    await mergeSortHelper(0, array.length - 1);
}

async function mergeSortHelper(left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortHelper(left, mid);
        await mergeSortHelper(mid + 1, right);
        await merge(left, mid, right);
    }
}

async function merge(left, mid, right) {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            array[k++] = leftArr[i++];
        } else {
            array[k++] = rightArr[j++];
        }
        drawArray();
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    while (i < leftArr.length) {
        array[k++] = leftArr[i++];
        drawArray();
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    while (j < rightArr.length) {
        array[k++] = rightArr[j++];
        drawArray();
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

async function quickSort() {
    await quickSortHelper(0, array.length - 1);
}

async function quickSortHelper(low, high) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
    }
}

async function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            await swap(i, j);
        }
    }
    await swap(i + 1, high);
    return i + 1;
}

async function swap(i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    drawArray();
    await new Promise(resolve => setTimeout(resolve, 100));
}

// Initial array generation
generateArray();
