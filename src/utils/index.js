const encode = (input) =>
  [...input]
    .map((x, i) => [x.charCodeAt(0), i])
    .sort()
    .flatMap((x) => x)
    .join(".")
    .match(/./g)
    .flatMap((x, i) => new Array(x == "." ? 1 : 2 + x * 2).fill((1 + i) % 2))
    .join("")
    .replace(/(([01])\2*)/g, (x) => `${+x ? "." : "-"}${x.length}`);

const decode = (input) =>
  input
    .match(/[-.](\d+)/g)
    .map((group) => {
      const [, separator, lengthStr] = group.match(/([-.])(\d+)/);
      const length = parseInt(lengthStr);
      return separator === "-" ? "0".repeat(length) : "1".repeat(length);
    })
    .map((el) => [el.length])
    .map((item) => (item - 2) / 2)
    .map((item, i, arr) => (item === -0.5 ? (arr[i] = " ") : item))
    .join("")
    .split(" ")
    .map(Number)
    .reduce((result, bit, index, array) => {
      if (index % 2 === 0) {
        result.push([array[index], array[index + 1]]);
      }
      return result;
    }, [])
    .sort((a, b) => a[1] - b[1])
    .map((code, i) => code.filter((el, i) => i % 2 === 0))
    .map((code) => String.fromCharCode(code))
    .join("");

const decodedString =
  ".4-2.4-1.4-6.1-4.2-4.1-12.1-4.2-12.1-2.1-4.2-18.1-4.4-1.4-2.18-1.6-1.4-4.4-1.8-1.4-4.6-1.16-1.4-4.12-1.4-8.1-4.4-16.1-18.1-4.4-18.1-10.1-4.6-6.1-4.2-1.4-6.6-1.20-1.8-6.1-4.1-8.6-1.14";

console.log(decode(decodedString));
