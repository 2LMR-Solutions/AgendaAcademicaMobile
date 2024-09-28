export function getDate() {
    return new Date(); 
  } 

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}