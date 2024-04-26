// 邮箱
export const reg_email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

// 数字+字母
export const nmb_letter = /^[A-Za-z0-9]+$/

// 11位数字
export const nmb_eleven = /^[0-9]{11}$/

// 8-15位字符，必须包含有字母和数字
export const reg_password = /^(?![^a-zA-Z]+$)(?!\D+$).{6,20}$/

// 匹配中英文数字，长度2-16位
export const str_cy2_16 = /^[\u4E00-\u9FA5a-zA-Z0-9_]{2,16}$/

// 匹配中英文数字，长度2-16位
export const str_len_10 = /^[\u4E00-\u9FA5a-zA-Z0-9_]{0,10}$/

// 小数点前面和后面都只有6位是数字
export const num_six_six = /(^[0-9]{0,6}$)|(^-?[0-9]{0,6}[\.]{1}[0-9]{0,6}$)/

// 小数点前面和后面都只有7位是数字
export const num_emissions = /(^-?[0-9]{0,7}$)|(^-?[0-9]{0,7}[\.]{1}[0-9]{0,7}$)/

// 正数（可以输入小数点）
export const num_positive = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/

// 数字0-999999，小数点后至多2位
// export const number_positive = /^(?!0\d)([0-9]{1,6}(?:\.\d{1,2})?$|1000000$/

// 数组范围1-999999 整数
export const num_nine = /^[1-9]\d{0,5}?$/

// 数组范围1-999999 6位小数
export const num_nine_sex = /^[1-9]\d{0,5}(?:\.\d{1,6})?$/

// 数组范围0-999999 6位小数
export const num_nine_0sex = /^[0-9]\d{0,4}(?:\.\d{1,6})?$/

// 数字0-9999，小数点后至多6位
export const num0496 = /^[0-9]\d{0,3}(?:\.\d{1,6})?$/

// 数字1-999999，小数点后至多3位
export const num0693 = /^[1-9]\d{0,5}(?:\.\d{1,3})?$/

// 数字0-999999，小数点后至多3位
export const num06931 = /^[0-9]\d{0,5}(?:\.\d{1,3})?$/

// 数字0-999999，小数点后至多2位
export const num0692 = /^[1-9]\d{0,5}(?:\.\d{1,2})?$/
