// validationUtils.js

export function validateInput(type, value) {
    switch (type) {
        case 'text':
            if (value.trim() === '') {
                return 'Text is required'
            }
            return '' // Không có lỗi

        case 'email':
            if (value.trim() === '') {
                return 'Email is required'
            }
            if (!/^\S+@\S+\.\S+$/.test(value)) {
                return 'Invalid email format'
            }
            return '' // Không có lỗi

        case 'password':
            if (value.trim() === '') {
                return 'Password is required'
            }
            if (value.length < 8) {
                return 'Password should be at least 8 characters long'
            }
            return '' // Không có lỗi

        case 'forgot-password':
            if (value.trim() === '') {
                return 'Email is required'
            }
            if (!/^\S+@\S+\.\S+$/.test(value)) {
                return 'Invalid email format'
            }
            return '' // Không có lỗi

        default:
            return 'Invalid input type' // Loại input không hợp lệ
    }
}
