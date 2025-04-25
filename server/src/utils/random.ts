// Exporting a function named `random` that generates a random string of a given length.
    export function random(len: number) {
    let options = "erdctfbghujmrdtfbghunjmrxctfvygbhun";
    let length = options.length;

    let ans = "";

    for (let i = 0; i < len; i++) {
        ans += options[Math.floor(Math.random() * length)];
    }

    return ans;
}










/*
Notes:
1. This function generates a random string by selecting random characters from a predefined set.
2. Avoid creating a `utils.ts` file to store miscellaneous functions or data without clear organization.
   - Storing unrelated or arbitrary functions and data in `utils.ts` is considered a bad practice.
   - Instead, organize functions into specific modules or files based on their purpose and usage.
3. Always aim for clean and modular code structure to improve maintainability and readability.
*/
