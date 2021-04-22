function norm() {
    let str1 = "2 ";
    let num = 3;
    while (num <= 100) {
    let j = 2;
    let flag = 0;
        while (j < num) {
            if ((num % 2 === 0) || (num % j === 0)) {
                flag++;
            }
            j++;
        }
            if (!flag) {
                str1 += (num + " ");
            }
        num++;
    }
    return str1;
    }
    console.time('Me');
    console.log(norm());
    console.timeEnd('Me');