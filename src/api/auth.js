import HttpClient from 'services/httpClient'

const httpClient = HttpClient()

const login = async (account) => {
    let result = {}
    try {
        const res = await httpClient.post('/login', account)
        if (res.data?.status) {
            result = {
                status: true,
                data: res.data.data,
                message: 'Login successful',
            }
        } else {
            throw new Error('Login is invalid')
        }
    } catch (error) {
        result = {
            status: false,
            message: error.message,
        }
    }
    return result
}

const getStaff = async (id) => {
    let result;
    try {
      const httpClient = HttpClient();
      const handleResponse = await httpClient.get(`/staff/${id}`);
      result = await handleResponse.data;
      console.log(result);
      if (result.status) {
        result = {
          status: true,
          data: result.data,
        };
      }
    } catch (error) {
      console.log(error);
      result = {
        status: false,
        message: "Profile not found",
      };
    }
    return result;
  };

const Authenticator = {
    login,
    getStaff,
}

export default Authenticator
