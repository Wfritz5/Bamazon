// let nums = [1, 5, 8, 220, 19, 34];
// let evenNums = [];
// let oddNums = [];

for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
        evenNums.push(nums[i]);
    } else {
        oddNums.push(nums[i]);

    }
};

for (let i = 0; i < nums.length; i++) {
    nums[i] % 2 === 0 ? evenNums.push(nums[i]) : oddNums.push(nums[i]);
};

// evenNums
// oddNums

// let res = [...evenNums,...oddNums];

// res


// !false ? console.log(true) : console.log(false);



const moreEvents = (arr) => {
    let evenNums = 0;
let oddNums = 0;
for (let i = 0; i < arr.length; i++) {
    arr[i] % 2 === 0 ? evenNums++ : oddNums++;
}
return evenNums>oddNums ? true : false;
}
console.log(moreEvents([1,2,3,4,5,]));

//pivot

let pivotNums = 0-1000;

//if given a random set of numbers, be able to determine 
//where the numbers on the left and the numbers on the right will equal each other... 
//[1, 2, 4, 3] answer 4 @ i=2;
//if there is no answer for the array then return -1.


