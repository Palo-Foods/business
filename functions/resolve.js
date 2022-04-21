// use this resolve function to resolve http request that comes through it
export const resolve = async(promise) => { 
  try {
    const result =  await promise;
    return [result, null]
  } catch (error) {
    return [null, error]
  }
}