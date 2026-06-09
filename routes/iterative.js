import {getcompletion} from "../utils/server.js";
const productDescription = `
The TechPro X1 chair has a mesh back, 
adjustable armrests, lumbar support, 
and comes in black or grey. 
It is designed for long hours of desk work 
and has a 5-year warranty.
`;
const prompt1=`write a product description on :${productDescription}`;
export async function runiterative() {
    try {
        const result = await getcompletion(prompt1);
        console.log(result);
        return result;
    } catch (error) {
        if (error.status === 429) {
            return "Error: Rate limit exceeded. Please try again later.";
        }
        return `Error: ${error.message || error}`;
    }
}