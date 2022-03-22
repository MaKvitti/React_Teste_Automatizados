import api from "./api";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import Conta from "./conta/Conta"

jest.mock("./api");
describe("Componente de conta", () => {
  describe("Requisições para API", () => {
    it("Exibir lista de transaçoes atraves da API", async () => {
      api.listaTransacoes.mockResolvedValue([
        {
          transacao: "saque",
          valor: "30.00",
          data: "30/09/2020",
          id: 1,
        },
        {
          transacao: "deposito",
          valor: "50.00",
          data: "30/09/2020",
          id: 2,
        },
      ]);

      render(<App />);

      expect(await screen.findByText("saque")).toBeInTheDocument();

      expect(screen.getByTestId("transacoes").children.length).toBe(2);
    });
  });
  
  it("Chama a função de realizar transação, quando o botão é clicado",()=>{

    const funcRelizarTran = jest.fn();
    render(<Conta saldo={1000} realizarTransacao={funcRelizarTran}/>)

    fireEvent.click(screen.getByText("Realizar operação"))

    expect(funcRelizarTran).toHaveBeenCalled()
  });
});
