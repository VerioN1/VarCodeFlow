const spliceIntoChunks = (arr:Array<any>, chunkSize:number) => {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
};
export default spliceIntoChunks;
