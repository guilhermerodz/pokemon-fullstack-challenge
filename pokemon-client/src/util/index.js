export default {
  pad(n, width, z) {
    z = z || '0';
    n += '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  },

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
};
