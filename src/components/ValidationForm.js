
export const FormValidate = (formData) => {
    const newErrors = {};
    const keys = Object.keys(formData)
    keys.map(key => {
        if (!formData.fname) {
            newErrors.fnameError = " Name is required";
        }
        if (!formData.email) {
            newErrors.emailError = "Email is required";
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.emailError = "Email is invalid";
        }
        if (!formData.password) {
            newErrors.passwordError = "Password is required";
        }
        if (!formData.repassword) {
            newErrors.passwordError = "Password is required";
        }
    })
    return newErrors;

}


