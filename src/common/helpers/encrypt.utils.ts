import * as crypto from 'crypto-js';

export const EncryptUtils = {
  decrypt: (data: string, token: string) => {
    let key = crypto.enc.Utf8.parse(token);
    key = crypto.MD5(key);
    key.words.push(key.words[0], key.words[1]);
    const decrypted = crypto.TripleDES.decrypt(
      { ciphertext: crypto.enc.Base64.parse(String(data)) },
      key,
      { mode: crypto.mode.ECB },
    );
    const user = decrypted.toString(crypto.enc.Utf8);
    return JSON.parse(String(user)) as IToken;
  },
};

export interface IToken {
  Login: string;
  Password: string;
  CodigoUsuario: number;
  Nome: string;
  Ativo: boolean;
  AlterarSenha: boolean;
  CodigoConta: number;
  CodigoPerfil: number;
  DescricaoPerfil: string;
  Lider: boolean;
  RefreshToken: string;
}
