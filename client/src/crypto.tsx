import CryptoJS from "crypto-js";

const secret_key: string | undefined = process.env.REACT_APP_AES_SECRETKEY;

export const do_Encrypt = (data: string): string | undefined => {
  if (!secret_key) {
    console.error('Secret key not set.');
    return undefined;
  }
  try {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secret_key
    ).toString();

    return encrypted
  } catch (error) {
    console.error('Error encrypting data:', error);
    return undefined;
  }

};


export const do_Decrypt = (cipher: string): string | undefined => {
  if (!secret_key) {
    console.error('Secret key not set.');
    return undefined;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(cipher, secret_key);
    const decrytedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrytedData
  } catch (error) {
    console.error('Error decrypting data:', error);
    return undefined;
  }

};
