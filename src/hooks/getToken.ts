const getToken = () => {
    const token = localStorage.getItem('token');
    if(token) return token
}

export default getToken