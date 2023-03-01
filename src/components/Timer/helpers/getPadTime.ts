function getPadTime(time: number): string {
  return Math.floor(time).toString().padStart(2, '0');
}

export default getPadTime;
