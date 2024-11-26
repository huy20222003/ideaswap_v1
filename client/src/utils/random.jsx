/**
 * Trả về một số nguyên ngẫu nhiên trong khoảng từ min (bao gồm) đến max (không bao gồm)
 * @param {number} min - Giá trị nhỏ nhất của phạm vi
 * @param {number} max - Giá trị lớn nhất của phạm vi (không bao gồm)
 * @returns {number} - Số nguyên ngẫu nhiên
 */
export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
