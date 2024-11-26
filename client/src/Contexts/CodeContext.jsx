import { useState, createContext} from 'react';
import codeApi from '../Service/codeApi';

export const CodeContext = createContext();

export const CodeProvider = (prop) => {
  const [openFormDialogVerifyCode, setOpenFormDialogVerifyCode] = useState(false);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const handleSendCode = async (data) => {
    try {
      const response = await codeApi.sendCode(data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const handleVerifyCode = async (data) => {
    try {
      const response = await codeApi.verifyCode(data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const CodeContextData = {
    openFormDialogVerifyCode, 
    setOpenFormDialogVerifyCode,
    handleSendCode,
    handleVerifyCode,
  };

  return (
    <CodeContext.Provider value={CodeContextData}>
      {prop.children}
    </CodeContext.Provider>
  );
};
