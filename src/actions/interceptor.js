
import axios from 'axios';
export const interceptor = () => {
    // Set the AUTH token for any request
  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if(token != null ){
        config.headers.Authorization =  token ? `${token}` : '';
        config.headers.affiliateCode = localStorage.getItem('selectedAfilliate');
        // debugger;
        return config;
    }
    return config
  },function(err){
    return Promise.reject(err)
  });

  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    
    // Do something with response data
    // debugger;
    return response;
  }, function (error) {
      const originalRequest = error.config;
        console.log(typeof(error))
    //   console.log('Original Request ',originalRequest);
        // debugger
        console.log('Error is ',error)
        debugger
        if(originalRequest === undefined || error.response.status === 401){
          // debugger;
            window.location.href="#/login";
            // localStorage.setItem("token",null);
            // localStorage.setItem("error401Se8mentMessage",error.response.data.message);
        }
    return Promise.reject(error);
  });
}