export const registerUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((user) => user.email === email);

    if(existingUser) {
        return {
            success : false,
            message : 'Email already registered!'
        };
    }
    users.push({email, password});
    localStorage.setItem('users', JSON.stringify(users));
    return {
        success : true,
        message : 'Registration successful!'
    };
};

export const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);
    
    if(user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        return {
            success : true
        };
    }
    
    return {
        success : false,
        message : 'Invalid email or password.'
    };
};

export const isAuthenticated = () => {
    return localStorage.getItem('loggedInUser') !==null;
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('loggedInUser'));
};

export const logoutUser = () => {
    localStorage.removeItem('loggedInUser');
};