// Base62 uses 62 characters: 0-9, a-z, A-Z. You take a number (your MongoDB _id)
//  and keep dividing it by 62, using the remainders to index into that character string.
// Example with a small number like 125:

// 125 ÷ 62 = 2 remainder 1
// 2 ÷ 62 = 0 remainder 2
// Read remainders backwards → characters at index 2, 1

