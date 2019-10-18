export const isAuthenticated = user => !!user;

export const isAllowed = (user,rights) => rights.some(right => user.rights.includes(right));

export const hasRole = (user,roles) => roles.some(role => user.authorities.includes(role));

// export const hasRole = function(user,roles) {
    
//    roles.some(role => user.authorities.includes(role));
    
// }