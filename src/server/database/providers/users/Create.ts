import { PasswordCrypto } from "../../../shared/services";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUser } from "../../models";

export const create = async (
  user: Omit<IUser, "id">
): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(user.senha);

    const [result] = await Knex(ETableNames.user)
      .insert({ ...user, senha: hashedPassword })
      .returning("id");

    if (typeof result === "object") return result.id;
    if (typeof result === "number") return result;

    return new Error("Erro ao cadastrar o usuário");
  } catch (error) {
    console.log("user provider error: ", error);
    return new Error("Erro ao cadastrar o usuário");
  }
};
