/**
 * @description model used to describe a biit account
 */
export interface Account {
    fname: string;
    lname: string;
    email: string;
    access_token: string;
    refresh_token: string;
}


/**
 * @description model used to send data to the Account
 * POST endpoint. for more information see the documentation
 * here https://github.com/biit-407/biit-server/wiki/Endpoints#account
 * 
 * @field fname: the first name of the user on the account
 * @field lname: the last name of the user on the account
 * @field email: the email of the user on the account 
 * @field refresh_token: the active refresh token (used for 
 * account validation on server side)
 * 
 * *NOTE*: Currently all of these fields should be derived from Azure
 */
export interface AccountPOST {
    fname: string;
    lname: string;
    email: string;
    refresh_token: string;
}

/**
 * @description model used to send data to the Account
 * GET (fetch) endpoint. for more information see the documentation
 * here https://github.com/biit-407/biit-server/wiki/Endpoints#account
 *
 * @field email: the email of the user on the account
 * @field refresh_token: the active refresh token (used for
 * account validation on server side)
 */
export interface AccountGET {
    email: string;
    refresh_token: string;
}

/**
 * @description model used to send data to the Account
 * PUT (change) endpoint. for more information see the documentation
 * here https://github.com/biit-407/biit-server/wiki/Endpoints#account
 *
 * @field fname: the first name of the user on the account
 * @field lname: the last name of the user on the account
 * @field email: the email of the user on the account
 * @field refresh_token: the active refresh token (used for
 * account validation on server side)
 */
export interface AccountPUT {
    fname: string;
    lname: string;
    email: string;
    refresh_token: string;
}

/**
 * @description model used to send data to the Account
 * DELETE endpoint. for more information see the documentation
 * here https://github.com/biit-407/biit-server/wiki/Endpoints#account
 * 
 * @field email: the email of the user on the account
 * @field refresh_token: the active refresh token (used for
 * account validation on server side)
 */
export interface AccountDELETE {
    email: string;
    refresh_token: string;
}