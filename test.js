function promise1() {
    return new Promise((res) => {
        setTimeout(() => {
            res(1);
        }, 1000);
    });
}

function promise2() {
    return new Promise((res) => {
        setTimeout(() => {
            res(2);
        }, 2000);
    });
}

function promise3() {
    return new Promise((res) => {
        setTimeout(() => {
            res(3);
        }, 3000);
    });
}



async function process(promiseArray) {
    
    for(const pr of promiseArray) {
        const response = await pr();
        console.log(response);
    }

}

process([promise1, promise2, promise3]);

// for(let i = 0; i < promiseArray.length; i++) { await promiseArray[i]()}